(function(angular) {

    "use strict";

    angular.module('abilities', ['ngSanitize', "common"]).component("swiaAvailableAbilities", {
        bindings: {
            character: "<",
            onPurchase: "&"
        },
        templateUrl: 'src/abilities/abilities.available.html',
        controller: function(CharacterChoices) {

            this.$onInit = function() {

                CharacterChoices.$loaded().then( () => {
                    this.available = [];
                    var abilities = this.getCharacterBaseAbilities();
                    for(var name in abilities) {
                        if(!this.character.abilities || !this.character.abilities[name]) {   //skip already purchased
                            this.available[this.available.length] = abilities[name];
                        }
                    }
                    this.available = this.available.sort(function(a,b) {
                        return a.cost > b.cost;
                    });
                });

            };

            this.getCharacterBaseAbilities = function() {
                var key = this.character.name;
                if(this.character.imperial) {
                    key = this.character.name + ' (' + this.character['class'].toLowerCase() + ')';
                }
                var base = CharacterChoices[key].abilities;
                return angularFireCopy(base);
            };
            
            this.getAbilityCost = function(ability) {
                if(isNaN(ability.cost))
                    return ability.cost.replace(/\s*xp\s*/i, '')*1;
                return ability.cost;
            };

            this.canPurchase = function(ability) {
                var xp = this.character.xp || 0;
                if(xp < this.getAbilityCost(ability)) 
                    return false;
                return !this.character.abilities || !this.character.abilities[ability.name];
            };

            this.hasEnoughXP = function(ability) {
                if(this.character.xp >= this.getAbilityCost(ability)) 
                    return "";
                else 
                    "Insufficent XP"
            }


            //
            this.purchaseAbility = function(ability) {
                this.onPurchase({ability: ability});
            };
        }
    });

}) (angular);