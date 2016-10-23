(function(angular) {
    
    "use strict";



    class HomeController {

        constructor (DataStore, $firebaseAuth, $timeout) {
            'ngInject';

            this.store = DataStore;
            this.auth = $firebaseAuth();

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
            
            var json = getCharacterShell();
            
            //associate user id for restricting who can edit
            json.userId = $scope.user.uid;  

            this.data[name] = json;
            this.data.$save().then(function() {
                //navigate to the new char page
                window.location = '#/' + encodeURIComponent(name);

            }).catch(function(error) {
                alert("Unable to create character because of an error");
            });

        }

    }


    var app = angular.module("dresden.home").component("home", {
        templateUrl: 'home/home.component.html',
        controller: HomeController
    });

}) (angular);