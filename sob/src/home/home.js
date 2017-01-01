(function(angular) {
    
    "use strict";

    var app = angular.module("sob-home", ["firebase", "sob-common"]);

    
    
    app.controller("HomeController", [
        "$scope", "$timeout", "DataStore", "$firebaseAuth", "ClassHelper", "CharacterShell",
        function($scope, $timeout, DataStore, $firebaseAuth, ClassHelper, CharacterShell) {
        
        var self = this;
        
        this.displayOpts = {
            loading: false,
            message: null,
            error: null
        };

        this.classOptions = ClassHelper.getClasses();

        var auth = $firebaseAuth();
        auth.$onAuthStateChanged(function(authData) {
            $scope.user = authData;

            if(authData && authData.uid) {
                self.displayOpts.loading = true;
                self.data = DataStore.getCharsForUser(authData.uid);
                self.data.$loaded().then(function() {
                    updateList();
                    self.displayOpts.loading = false;
                }).catch(function(error) {
                    self.displayOpts.error = "Failed to load saved data: " + error.data;
                });
            } else {
                if(self.data) {
                    self.data.$destroy();
                }
                updateList();
            }

        });

        

        function updateList() {
            var chars = {};
            if(self.data) {
                angular.forEach(self.data, function(value, key) { 
                    if($scope.user && value.userId && value.userId === $scope.user.uid)
                        chars[key] = {
                            name: (value.name || /* hack for pre-v3 chars */key), 
                            className: ClassHelper.getClassName(value['class'])
                        }; 
                });
            }
            self.chars = chars;
        }

        this.createCharacter = function() {
            
            // var json = getCharacterShell();
            CharacterShell(this.newCharClass).then(function(json) {

                var name = prompt("Name the character", "Joe Bob");
                if(!name) {
                    alert("Characters must have a name");
                    return;
                } 

                //associate user id for restricting who can edit
                json.userId = $scope.user.uid;  
                json.name = name;

                // console.log(json);
                var charId = UUID();
                self.data[charId] = json;
                self.data.$save().then(function() {
                    //navigate to the new char page
                    // window.location = '#/' + encodeURIComponent(name);
                    window.location = '#/' + charId;

                }).catch(function(error) {
                    alert("Unable to create character because of an error");
                });
            });

        };

        this.removeCharacter = function(name) {
            this.data[name] = null;
            this.data.$save().then(function() {
                updateList();
            });
        };

    }]);


    function getCharacterShell() {
        return {
            "abilities" : {},
            "class" : " ",
            "clothing" : {
                "Hat" : {},
                "Face" : {},
                "Shoulders" : {},
                "Coat" : {},
                "Torso": {},
                "Gloves": {},
                "Belt": {},
                "Pants": {},
                "Boots": {}
            },
            "combat" : 1,
            "corruption" : {
              "current" : 0,
              "max" : 5
            },
            "darkstone" : 0,
            "defense" : 5,
            "faith" : 0,
            "grit" : {
              "current" : 1,
              "max" : 2
            },
            "health" : {
              "max" : 10,
              "wounds" : 0
            },
            "init" : 2,
            "items" : { },
            "keywords" : " ",
            "level" : 1,
            "melee" : 5,
            "movement" : 0,
            "ranged" : 5,
            "sanity" : {
              "loss" : 0,
              "max" : 10
            },
            "sidebag" : {
              "capacity" : 5,
              "whiskey" : 0,
              "fungus": 0,
              "tonic": 0,
              "bandages": 0,
              "herbs": 0,
              "dynamite": 0,
              "flash": 0
            },
            "stats" : {
              "Agility" : 1,
              "Cunning" : 1,
              "Lore" : 1,
              "Luck" : 1,
              "Spirit" : 1,
              "Strength" : 1
            },
            "wealth" : 0,
            "willpower" : 5,
            "xp" : 0
        };
    }


}) (angular);