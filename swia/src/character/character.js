(function(angular) {
    
    "use strict";

    var app = angular.module("character", ['ngSanitize', "common", "items", "abilities"]).component("swiaCharacter", {
        
        templateUrl: "src/character/character.html",

        controller: function($routeParams, $compile, Character, CharacterChoices) {
        
            this.displayOpts = {
                loading: true,
                message: null,
                error: null
            };

            //load the campaign
            var campName = decodeURIComponent($routeParams.campId);
            var charName = decodeURIComponent($routeParams.charId);
            this.campaign = campName;
            this.character = Character(campName, charName);
            this.character.$loaded().then( () => {

                //load base information
                CharacterChoices.$loaded().then( () => {
                    this.baseData = this.getCharacterBase();
                    this.displayOpts.loading = false;

                }).catch( (error) => {
                    this.displayOpts.loading = false;
                    this.displayOpts.error = error.data;
                });

            }).catch( (error) => {
                this.displayOpts.loading = false;
                this.displayOpts.error = error.data;
            });


            this.getCharacterBase = function() {
                var base = CharacterChoices[this.character.name];
                if(this.character.imperial) {
                    base = CharacterChoices[this.character.name + ' (' + this.character['class'].toLowerCase() + ')'];
                }
                return angularFireCopy(base);
            };

            function getAbilityCost(ability) {
                return ability.cost.replace(/\s*xp\s*/i, '')*1;
            }

            //
            this.increaseXP = function() {
                this.character.xp += 1;
                this.character.$save();
            };

            //
            this.purchaseAbility = function(ability) {
                this.character.abilities = this.character.abilities || {};
                this.character.abilities[ability.name] = ability;
                this.character.xp -= ability.cost;
                // this.character.$save();
            };

            this.increaseThreat = function() {
                this.character.threat += 1;
                this.character.$save();
            };
            this.decreaseThreat = function() {
                if(this.character.threat > 0) {
                    this.character.threat -= 1;
                    this.character.$save();
                }
            };
            this.increaseRound = function() {
                this.round = this.round || 1;
                this.round++;
            };
            

            //
            this.increaseStat = function(name) {
                
                if(name === 'strain') {
                    this.character.stats[name] += 1;

                } else if(name === 'health') {
                    var max = this.baseData[this.character.condition].health;
                    if(this.character.stats[name] !== max)
                        this.character.stats[name] += 1;
                }

                this.character.$save();
            };

            //
            this.decreaseStat = function(name) {
                
                if(name === 'health') {
                    if(this.character.stats[name] === 1) {
                        if(this.character.condition === 'wounded') {
                            //TODO dead
                            this.character.stats[name] = 0;

                        } else {
                            //wounded
                            this.character.condition = 'wounded';
                            this.character.stats[name] = this.baseData[this.character.condition].health;
                        }
                    } else 
                        this.character.stats[name] -= 1;
                }
                if(name === 'strain') {
                    if(this.character.stats[name] > 0)
                        this.character.stats[name] -= 1;
                }
                this.character.$save();
            };

        }
    });


}) (angular);