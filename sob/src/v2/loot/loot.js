(function(angular) {
    
    "use strict";



    var lootOptions = [
        {
            label: "What's This?!",
            description: "Drawn an Artifact card. (or a Gear card if in another World)"
        },
        {
            label: "This Should Come in Handy",
            description: "Drawn a Gear card. (or an Artifact card if in another World)"
        },
        {
            label: "This Should Come in Handy",
            description: "Drawn a Gear card. (or an Artifact card if in another World)"
        },
        {
            label: "Dark Stone Shard",
            description: "Gain 1 Dark Stone",
            apply: function(character) {
                character.darkstone = character.darkstone || 0;
                character.darkstone+=1;
            }
        },
        {
            label: "Dark Stone Shard",
            description: "Gain 1 Dark Stone",
            apply: function(character) {
                character.darkstone = character.darkstone || 0;
                character.darkstone+=1;
            }
        },
        {
            label: "Dark Stone Rock",
            description: "Gain D3 Dark Stone",
            roll: function() { return Math.ceil(Math.random()*3); },
            apply: function(character, value) {
                character.darkstone = character.darkstone || 0;
                character.darkstone+=value;
            }
        },
        {
            label: "Coins",
            description: "Gain 25 Gold",
            apply: function(character) {
                character.wealth+=25;
            }
        },
        {
            label: "Cash",
            description: "Gain 50 Gold",
            apply: function(character) {
                character.wealth+=50;
            }
        },
        {
            label: "Sack of Gold Dust",
            description: "Gain 100 Gold",
            apply: function(character) {
                character.wealth+=100;
            }
        },
        {
            label: "Gold Bars",
            description: "Gain 250 Gold",
            apply: function(character) {
                character.wealth+=250;
            }
        },
        {
            label: "Blood Money",
            description: "Gain D6 x 25 Gold",
            roll: function() { return (25*Math.ceil(Math.random()*6)); },
            apply: function(character, value) {
                character.wealth+=value;
            }
        },
        {
            label: "Cash",
            description: "Gain D6 x 50 Gold",
            roll: function() { return (50*Math.ceil(Math.random()*6)); },
            apply: function(character, value) {
                character.wealth+=value;
            }
        }
    ];


    var scavengeOptions = [
        { label: "Nothing Here", description: "Nothing to find." },
        { label: "Chilling Dread", description: "Draw a Growing Dread card." },
        { label: "Nothing Here", description: "Nothing to find." },
        { label: "Emerging Darkness", description: "Draw a Darkness card." },
        { label: "Nothing Here", description: "Nothing to find." },
        {
            label: "Hideous Discovery",
            description: "Take 3 Horror Hits. Lose 2 Sanity for each Horror Hit failed.",
            roll: function(character) {
                var dmg = 0;
                for(var i=0; i<3; ++i) {
                    if(Math.ceil(Math.random()*6) < character.willpower)
                        dmg += 2;
                }
                return dmg;
            },
            apply: function(character, value) {
                character.sanity.loss += value;
            }
        },
        {
            label: "Hideous Discovery",
            description: "Take 3 Horror Hits. Lose 2 Sanity for each Horror Hit failed.",
            roll: function(character) {
                var dmg = 0;
                for(var i=0; i<3; ++i) {
                    if(Math.ceil(Math.random()*6) < character.willpower)
                        dmg += 2;
                }
                return dmg;
            },
            apply: function(character, value) {
                character.sanity.loss += value;
            }
        },
        { label: "Nothing Here", description: "Nothing to find." },
        { label: "Useful Discovery", description: "Draw a Gear Card" },
        {
            label: "Small Find",
            description: "Gain 50 Gold",
            apply: function(character) {
                character.wealth += 50;
            }
        },
        {
            label: "Small Find",
            description: "Gain 50 Gold",
            apply: function(character) {
                character.wealth += 50;
            }
        },
        {
            label: "Something Shiny",
            description: "Roll a D6: (1-4) 1 Dark Stone, (5) Draw a Gear card, (6) Draw an Artifact card",
            roll: function() {
                var roll = Math.ceil(Math.random()*6);
                if(roll < 5) return 1;
                if(roll < 6) return "Gear card";
                return "Artifact card";
            },
            apply: function(character, value) {
                if(typeof(value) === 'number')
                    character.darkstone += 1;
            }
        }
    ];



    angular.module("sob-character")

    .component('loot', {

        bindings: {
            character: "=",
            onSave: '&'
        },
        templateUrl: 'src/v2/loot/loot.html',
        
        controller: function($scope, $element) {
            
            this.$onInit = function () { };

            this.rollForLoot = function() {
                this.lootRolled = angular.copy(lootOptions[Math.floor(Math.random()*12)]);
                if(this.lootRolled.roll) {
                    this.lootRolled.value = this.lootRolled.roll();
                }
            };

            this.clearLoot = function() {
                this.lootRolled = null;
            };

            this.applyLoot = function() {
                this.character.xp+=20;
                if(this.lootRolled.apply) {
                    this.lootRolled.apply(this.character, this.lootRolled.value);    
                }
                this.onSave();
                this.clearLoot();
            };
        }
    })





    .component('scavenge', {

        bindings: {
            character: "=",
            onSave: '&'
        },
        templateUrl: 'src/v2/loot/scavenge.html',
        
        controller: function($scope, $element) {
            
            this.$onInit = function () { };

            this.rollForScavenge = function() {
                this.scavengeRolled = angular.copy(scavengeOptions[Math.floor(Math.random()*12)]);
                if(this.scavengeRolled.roll) {
                    this.scavengeRolled.value = this.scavengeRolled.roll(this.character);
                }
            };

            this.clearScavenge = function() {
                this.scavengeRolled = null;
            };

            this.applyScavenge = function() {
                this.character.xp+=10;
                if(this.scavengeRolled.apply) {
                    this.scavengeRolled.apply(this.character, this.scavengeRolled.value);    
                }
                this.onSave();
                this.clearScavenge();
            };
        }
    })

    ;


}) (angular);