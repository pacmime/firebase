(function(angular) {
    
    "use strict";

    var app = angular.module("sob-home", ["firebase", "sob-common"]);

    
    
    app.controller("HomeController", [
        "$scope", "$timeout", "DataStore", "Auth",
        function($scope, $timeout, DataStore, Auth) {
        
        var self = this;
        
        this.displayOpts = {
            loading: true,
            message: null,
            error: null
        };


        Auth.$onAuth(function(authData) {
            $scope.user = authData;

            self.data = DataStore('userId', authData ? authData.uid : null);
            self.data.$loaded().then(function() {
                updateList();
                self.displayOpts.loading = false;
            }).catch(function(error) {
                self.displayOpts.error = "Failed to load saved data: " + error.data;
            });
          

        });

        

        function updateList() {
            var chars = [];
            angular.forEach(self.data, function(value, key) { 
                if($scope.user && value.userId && value.userId === $scope.user.uid)
                    chars.push(key); 
            });
            self.chars = chars;
        }

        this.createCharacter = function() {
            var name = prompt("Name the character", "Joe Bob");
            if(!name) {
                alert("Characters must have a name");
                return;
            } else if(self.data[name]) {
                alert("Name is already in use");
                return;
            }
            
            var json = getCharacterShell();
            
            //associate user id for restricting who can edit
            json.userId = $scope.user.uid;  

            self.data[name] = json;
            self.data.$save().then(function() {
                //navigate to the new char page
                window.location = '#/' + encodeURIComponent(name);

            }).catch(function(error) {
                alert("Unable to create character because of an error");
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