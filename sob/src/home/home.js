(function(angular) {
    
    "use strict";

    var app = angular.module("sob-home", ["firebase", "sob-common"]);

    
    
    app.controller("HomeController", [

        "$scope", "$timeout", "DataStore", "$firebaseAuth", 
        "ClassHelper", "CharacterShell", "UUIDFactory",

        function($scope, $timeout, DataStore, $firebaseAuth, 
                 ClassHelper, CharacterShell, UUIDFactory) {
        
            var self = this;
            
            this.displayOpts = {
                loading: false,
                message: null,
                error: null,
                confirmDelete: {}
            };

            this.classOptions = ClassHelper.getClasses();

            var auth = $firebaseAuth();
            auth.$onAuthStateChanged( authData => {
                
                $scope.user = authData;

                if(authData && authData.uid) {
                    this.displayOpts.loading = true;
                    this.data = DataStore.getCharsForUser(authData.uid);
                    this.data.$loaded().then( () => {
                        this.updateList();
                        this.displayOpts.loading = false;
                    }).catch( (error) => {
                        this.displayOpts.error = "Failed to load saved data: " + error.data;
                    });
                } else {
                    if(this.data) {
                        this.data.$destroy();
                    }
                    this.updateList();
                }

            });

            

            this.updateList = function() {
                var chars = [];
                if(this.data) {
                    angular.forEach(this.data, function(value, key) { 
                        if($scope.user && value.userId && value.userId === $scope.user.uid) {
                            chars.push({
                                id: key,
                                name: (value.name || /* hack for pre-v3 chars */key), 
                                className: ClassHelper.getClassName(value['class']),
                                level: value.level
                            }); 
                        }
                    });
                }
                this.chars = chars.sort(function(a,b) { return a.level<b.level; });
            };

            this.createCharacter = function() {
                
                if(!$scope.user) {
                    alert("Must be logged in");
                    return;
                }

                CharacterShell(this.newCharClass).then( json => {

                    //associate user id for restricting who can edit
                    json.userId = $scope.user.uid;
                    json.name = this.newCharName;  
                    
                    this.newCharName = null;
                    this.newCharClass = null;                    
                    
                    this.displayOpts.creating = json.name;

                    DataStore.create(json).then( 
                        (result) => {
                            console.log(result.key);
                            this.displayOpts.creating = null;
                            window.location = '#/' + result.key;
                        },
                        (error) => {
                            this.displayOpts.creating = null;
                            alert("Unable to create character because of an error: " + error.message);
                            console.log(error);
                        }
                    );


                    // let result = this.data.push(json);
                    // let charId = result.key;


                    // console.log(json);
                    // var charId = UUIDFactory();
                    // this.data[charId] = json;
                    
                    // this.displayOpts.creating = this.data[charId].name;

                    // this.data.$save().then(
                    //     ref => {
                    //         this.displayOpts.creating = null;
                    //         window.location = '#/' + charId;
                    //     }, 
                    //     error => {
                    //         this.displayOpts.creating = null;
                    //         alert("Unable to create character because of an error: " + error.message);
                    //     }
                    // );
                });

            };

            this.removeCharacter = function(name) {

                DataStore.remove(name).then(
                    () => { 
                        this.data[name] = null;
                        this.updateList(); 
                    },
                    (error) => {
                        alert("Unable to delete character because of an error");
                    }
                );

                // this.data[name] = null;
                // this.data.$save().then( () => {
                //     this.updateList();
                // }).catch( (error) => {
                //     alert("Unable to delete character because of an error");
                // });
            };

        }
    ]);


    app.component('homeChar', {

        bindings: {
            character: '<',
            onDelete: '&'
        },

        template: `
            <div class="f-container f-row f-justify-between">
                <div class="f-cell">
                    
                    <a href="#/{{$ctrl.character.id}}" ng-if="!$ctrl.isDeleting">
                        {{$ctrl.character.name}} &nbsp;&nbsp;&nbsp;
                    </a>
                    <span ng-if="$ctrl.isDeleting">{{$ctrl.character.name}}</span>

                    <br class="visible-xs-block">
                    <small ng-if="$ctrl.character.className">
                        Level {{$ctrl.character.level}} 
                        <strong>{{$ctrl.character.className}}</strong>
                    </small>
                </div>
                <div>
                    <div class="btn-group" ng-if="$ctrl.confirmDelete">
                        <button type="button" class="btn btn-sm btn-success" 
                            ng-click="$ctrl.remove()">
                            <span class="glyphicon glyphicon-ok"></span>
                        </button>
                        <button type="button" class="btn btn-sm btn-default" 
                            ng-click="$ctrl.confirmDelete=false">
                            <span class="glyphicon glyphicon-ban-circle"></span>
                        </button>     
                    </div>
                    <button ng-if="!$ctrl.confirmDelete&&!$ctrl.isDeleting"
                        type="button" class="btn btn-sm btn-danger" 
                            ng-click="$ctrl.confirmDelete=true">
                        <span class="glyphicon glyphicon-trash"></span>
                    </button>
                    <button type="button" ng-if="$ctrl.isDeleting">
                        <span class="glyphicon glyphicon-hourglass spin"></span>
                    </button>
                </div>
            </div>
        `,

        controller: function() {

            this.remove = function() {
                this.confirmDelete = false;
                this.isDeleting = true;
                this.onDelete({name: this.character.id});
            };
        }
    });


}) (angular);