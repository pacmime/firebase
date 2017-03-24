(function(angular) {
    
    "use strict";

    var app = angular.module("campaign", ["common"]);


    app.component("swiaCampaign", {
        
        templateUrl: 'src/campaign/campaign.html',

        controller: function($routeParams, Campaign, CharacterChoices) {
        
            this.$onInit = function() {
                this.displayOpts = {
                    loading: true,
                    message: null,
                    error: null,
                    displayChoices: false
                };

                //load the campaign
                var campaignName = this.campId = decodeURIComponent($routeParams.id);
                this.campaign = Campaign(campaignName);
                this.campaign.$loaded().then( () => {
                    this.displayOpts.loading = false;
                }).catch(function(error) {
                    this.displayOpts.loading = false;
                    this.displayOpts.error = error.data;
                });


                //load base class options
                this.choices = CharacterChoices;
            };
            

            //is this character already chosen in this campaign?
            this.hasCharacter = function(name) {
                var found = false;
                var isImperial = ~name.indexOf('Imperial Officer');
                angular.forEach(this.campaign.characters, function(character, key) {
                    if(found) return;
                    found = character.name === name || 
                            (isImperial && character.name === 'Imperial Officer');
                });
                return found;
            };

            //create char from base classes
            this.createFrom = function(character) {

                //hide choice list
                this.displayOpts.displayChoices = false;
                    
                var id = UUID();

                //append character to loaded campaign
                this.campaign.characters = this.campaign.characters || {};
                this.campaign.characters[id] = this.prepChar(character);

                //and save the now changed campaign
                this.campaign.$save()
                    .then( () => {
                        this.displayOpts.message = "Character created";
                    }).catch( (error) => {
                        this.displayOpts.error = "Failed to save new character: " + error.data;
                    });

            };

            this.prepChar = function(character) {
                var result = angularFireCopy(character);
                if(result.name === 'Imperial Officer') {
                    //clear non-starting abilities
                    angular.forEach(result.abilities, function(name, ability) {
                        if(ability.cost > 0)
                            result[name] = null;
                    });

                } else {
                    result.abilities = {};
                    result.condition = "normal";
                    result.stats = {
                        strain: 0,
                        health: character.normal.health
                    };
                }
                return result;
            }
        }
    });

}) (angular);