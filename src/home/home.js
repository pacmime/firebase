(function(angular) {
    
    "use strict";

    var app = angular.module("home", ["firebase", "campaign"]);

    app.factory("CharacterChoices", ["$firebaseArray",
        function($firebaseArray) {

            var ref = new Firebase("https://intense-fire-8692.firebaseio.com/base/characters");

            // this uses AngularFire to create the synchronized array
            return $firebaseArray(ref);
        }
    ]);

    app.factory("SavedInfo", ["$firebaseObject",
        function($firebaseObject) {
            var ref = new Firebase("https://intense-fire-8692.firebaseio.com/saved");
            return $firebaseObject(ref);
        }
    ]);

    
    app.controller("HomeController", [
        "$scope", "$timeout", "CharacterChoices", "SavedInfo", "Campaign",
        function($scope, $timeout, CharacterChoices, SavedInfo, Campaign) {
        
        var self = this;
        
        this.displayOpts = {
            loading: 2,
            message: null,
            error: null
        };


        //load base class options
        this.choices = CharacterChoices;
        CharacterChoices.$loaded().then(function() {
            self.displayOpts.loading-=1;
        }).catch(function(err) {
            self.displayOpts.error = "Failed to load base character options: " + err.data;
        });


        //load saved campaigns
        SavedInfo.$loaded().then(function() {
            updateCampaignList();
            self.displayOpts.loading-=1;
        }).catch(function(error) {
            self.displayOpts.error = "Failed to load saved data: " + error.data;
        });
        

        function updateCampaignList() {
            var camps = [];
            angular.forEach(SavedInfo, function(value, key) { 
                camps.push({
                    name: key,
                    numChars: Object.keys(value).length
                }); 
            });
            self.campaigns = camps;
        }


        //methods

        this.createCampaign = function() {
            var campaignName = prompt("Give the campaign a name:");
            SavedInfo[campaignName] = {};
            SavedInfo.$save().then(updateCampaignList).catch(function(err) {
                self.displayOpts.error = "Failed to create campaign " + err.data;
            });
        };

        this.createFrom = function(character) {

            var campaignName = prompt("Enter the campaign:");
            var campaign = Campaign(campaignName);
            campaign.$loaded().then(function() {

                var id = Math.floor(Math.random()*999999);
                campaign[id] = {
                    name: character.name,
                    condition: "normal",
                    stats: {
                        endurance: character.normal.endurance,
                        health: character.normal.health,
                        speed: character.normal.speed
                    },
                    weapons: [character.weapons[0]]
                };

                campaign.$save().then(function() {
                    updateCampaignList();
                    self.displayOpts.message = "Character created";
                }).catch(function(error) {
                    self.error = "Failed to save new character: " + error.data;
                });

            }).catch(function(error) {
                self.error = "Failed to load campaign: " + error.data;
            });

        };

    }]);

}) (angular);