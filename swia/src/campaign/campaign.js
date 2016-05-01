(function(angular) {
    
    "use strict";

    var app = angular.module("campaign", ["firebase"]);

    app.factory("Campaign", ["$firebaseObject",
        function($firebaseObject) {
            return function(campaign) {
                var ref = new Firebase("https://intense-fire-8692.firebaseio.com/saved/" + campaign);
                return $firebaseObject(ref);
            }
        }
    ]);

    app.factory("CharacterChoices", ["$firebaseArray",
        function($firebaseArray) {

            var ref = new Firebase("https://intense-fire-8692.firebaseio.com/base/characters");

            // this uses AngularFire to create the synchronized array
            return $firebaseArray(ref);
        }
    ]);


    app.controller("CampaignController", [
        "$scope", "$routeParams", "Campaign", "CharacterChoices", 
        function($scope, $routeParams, Campaign, CharacterChoices) {
        
        var self = this;
        
        this.displayOpts = {
            loading: true,
            message: null,
            error: null,
            displayChoices: false
        };

        //load the campaign
        var campaignName = this.campId = decodeURIComponent($routeParams.id);
        this.campaign = Campaign(campaignName);
        this.campaign.$loaded().then(function() {
            self.displayOpts.loading = false;
        }).catch(function(error) {
            self.displayOpts.loading = false;
            self.displayOpts.error = error.data;
        });


        //load base class options
        this.choices = CharacterChoices;
        

        //is this character already chosen in this campaign?
        this.campaignHasChar = function(character) {
            var charName = character.name;
            for(var id in this.campaign) {
                if(this.campaign[id] && this.campaign[id].name && 
                    this.campaign[id].name===charName)
                    return true;
            }
            return false;
        };

        //create char from base classes
        this.createFrom = function(character) {

            //hide choice list
            self.displayOpts.displayChoices = false;
                
            var id = Math.floor(Math.random()*999999);

            //append character to loaded campaign
            self.campaign[id] = {
                name: character.name,
                condition: "normal",
                stats: {
                    strain: 0,
                    health: character.normal.health
                },
                weapons: [character.weapons[0]]
            };

            //and save the now changed campaign
            campaign.$save().then(function() {
                updateCampaignList();
                self.displayOpts.message = "Character created";
            }).catch(function(error) {
                self.error = "Failed to save new character: " + error.data;
            });

        };

    }]);

}) (angular);