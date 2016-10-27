(function(angular) {
    
    "use strict";



    class NavController {

        constructor (DataStore, CharacterShell, $firebaseAuth, $timeout, $state) {
            'ngInject';

            this.store = DataStore;
            this.auth = $firebaseAuth();
            this.blankChar = CharacterShell;
            this.state = $state;

        }

        $onInit () {
            this.displayOpts = {
                loading: false,
                message: null,
                error: null
            };

            let loadback = () => {
                this.updateList();
                this.displayOpts.loading = false;
            };
            let errback = (error) => 
                this.displayOpts.error = "Failed to load saved data: " + error.data;

            let callback = (authData) => {
                this.user = authData;

                if(authData && authData.uid) {
                    this.displayOpts.loading = true;
                    this.data = this.store.getCharsForUser(authData.uid);
                    this.data.$loaded().then(loadback).catch(errback);
                } else if(this.data) {
                    this.data.$destroy();
                }
            };

            this.auth.$onAuthStateChanged(callback);
        }

        $onDestroy () {
            this.store = null;
            this.auth = null;
            this.blankChar = null;
            this.state = null;
        }
        

        updateList () {
            if(!this.user) return;

            var id = this.user.uid;
            var chars = [];

            angular.forEach(this.data, function(value, key) { 
                if(value.userId && value.userId === id)
                    chars.push(key); 
            });
            this.chars = chars;
        }

        createCharacter () {

            var name = prompt("Name the character", "Joe Bob");
            if(!name) {
                alert("Characters must have a name");
                return;
            } else if(this.data[name]) {
                alert("Name is already in use");
                return;
            }
            
            //associate user id for restricting who can edit

            var json = angular.copy(this.blankChar);
            json.userId = this.user.uid;  
            json.name = name;

            this.data[name] = json;
            this.data.$save().then( () => {
                
                this.state.go('char', {id: name});

                // //navigate to the new char page
                // window.location = '#/' + encodeURIComponent(name);

            }).catch(function(error) {
                alert("Unable to create character because of an error");
            });

        }

        removeChar (name) {
            this.data[name] = null;
            this.data.$save().then( () => {
                this.updateList();
            });
        }

    }


    var app = angular.module("dresden.home").component("sidebar", {
        templateUrl: 'home/sidebar.component.html',
        controller: NavController
    });

}) (angular);