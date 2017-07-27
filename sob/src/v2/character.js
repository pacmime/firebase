(function(angular) {
    
    "use strict";

    var app = angular.module("sob-character", ['ngSanitize', 'ui.bootstrap', "firebase", 'sob-common']);


    app.component('character', {

        templateUrl: 'src/v2/character.html',
        replace: true,

        controller: function($rootScope, $routeParams, $timeout, CharacterRef, ClassHelper) {
        
            var self = this;
            
            this.displayOpts = {
                loading: true,
                message: null,
                error: null
            };

            this.panel="char";
            this.showAll=false;

            this.xpLevels = [0, 500, 1000, 2000, 3000, 4500, 6000];

            //load the campaign
            this.character = CharacterRef(decodeURIComponent($routeParams.charId));

            this.classes = ClassHelper.getClasses();


            this.onInputKeyPress = function($event) {
                var key = $event.keyCode || $event.which;
                if(key === 13) {    //enter
                    // this.save();
                }
            };

            this.onXP = function() {
                //amount needed to reach next level
                var xpToLevel = this.xpLevels[this.character.level];
                if(this.character.xp >= xpToLevel) {
                    this.character.level += 1;
                    this.character.xp -= xpToLevel;
                }
                this.save();
            };


            this.save = function() {

                var success = function(ref) {
                    
                    //re-apply modifiers in case items changed
                    // self.recalc();

                    self.displayOpts.message = "Saved!";
                    $timeout(function() {
                        self.displayOpts.message = null;
                    }, 2000);
                };
                var failure = function(error) {
                    console.log("There was an error saving the character: ");
                    console.log(error);
                    self.displayOpts.error = "Unable to save character";
                    console.log(self.character);
                    $timeout(function() {
                        self.displayOpts.error = null;
                    }, 5000);
                };
                this.character.$save().then(success, failure);
            };

            this.getAvailableSidebagCapacity = function() {
                if(!self.character.sidebag) return 0;
                var weight = 0;
                for(var k in self.character.sidebag) {
                    if(self.character.sidebag.hasOwnProperty(k) && 'capacity' !== k) {
                        weight += self.character.sidebag[k] || 0;
                    }
                }
                return self.character.sidebag.capacity - weight;
            };

            this.canCastSermons = function() {
                return this.character['class'] && 'Preacher' === ClassHelper.getClassName(this.character['class']);
            };


            this.$onInit = function() {

                self.character.$loaded().then(function() {
                    
                    self.charName = self.character.name || decodeURIComponent($routeParams.charId);
                    
                    //apply v3 fix to convert data
                    if(ClassHelper.fixV3(self.charName, self.character))
                        self.save();

                    self.charClass = ClassHelper.getClassName(self.character['class']);

                    //intialize sidebag tokens
                    self.character.sidebag = self.character.sidebag || {};
                    self.character.sidebag.bandages = self.character.sidebag.bandages || 0;
                    self.character.sidebag.dynamite = self.character.sidebag.dynamite || 0;
                    self.character.sidebag.herbs = self.character.sidebag.herbs || 0;
                    self.character.sidebag.fungus = self.character.sidebag.fungus || 0;
                    self.character.sidebag.antiRad = self.character.sidebag.antiRad || 0;
                    self.character.sidebag.flash = self.character.sidebag.flash || 0;
                    self.character.sidebag.shatterGrenade = self.character.sidebag.shatterGrenade || 0;
                    self.character.sidebag.tonic = self.character.sidebag.tonic || 0;
                    self.character.sidebag.whiskey = self.character.sidebag.whiskey || 0;
                    
                    self.character.sidebag.spices = self.character.sidebag.spices || 0;
                    self.character.sidebag.potions = self.character.sidebag.potions || 0;
                    self.character.sidebag.hatchets = self.character.sidebag.hatchets || 0;
                    self.character.sidebag.lanternOil = self.character.sidebag.lanternOil || 0;
                    self.character.sidebag.exoticHerbs = self.character.sidebag.exoticHerbs || 0;
                    self.character.sidebag.tequila = self.character.sidebag.tequila || 0;
                    self.character.sidebag.cigars = self.character.sidebag.cigars || 0;


                    //apply modifiers to stats, etc
                    self.recalc();
                
                });

            };

            /**
             * apply modifiers and update modified values
             */
            this.recalc = function() {

                this.modifiers = {
                    stats: { Agility: 0, Cunning: 0, Spirit: 0, Strength: 0, Lore: 0, Luck: 0 },
                    init: 0,
                    move: 0,
                    combat: 0,
                    health: { max: 0 },
                    sanity: { max: 0 },
                    corruption: { max: 0 },
                    grit: { max: 0 },
                    faith: 0,
                    armor: 0,
                    spiritArmor: 0,
                    defense: 0,
                    sidebag: { capacity: 0 }
                };

                this.updateModifiers(this.character.items, true);
                this.updateModifiers(this.character.abilities, false);
                this.updateModifiers(this.character.mutations, false);    //covers madness/injuries too

                // console.log(modifiers);
            };

            this.updateModifiers = function(source, mustBeEquipped) {

                angular.forEach(source, (src) => {

                    //only bother if the src is marked as equipped
                    // and has modifiers associated with it
                    if(src.modifiers && (!mustBeEquipped || src.equipped)) {

                        angular.forEach(src.modifiers, (modifier) => {

                            let modVal = isNaN(modifier.value) ? 0 : modifier.value*1;

                            switch(modifier.affects) {
                                case "Agility": 
                                case "Cunning":
                                case "Spirit":
                                case "Strength":
                                case "Lore":
                                case "Luck":
                                    this.modifiers.stats[modifier.affects] += modVal;
                                    break;
                                case "init":
                                case "move":
                                case "combat":
                                case "faith":
                                case "armor":
                                case "spiritArmor":
                                case "defense":
                                case "willpower": 
                                    this.modifiers[modifier.affects] += modVal;
                                    break;
                                case "health":
                                case "sanity":
                                case "corruption":
                                case "grit":
                                    this.modifiers[modifier.affects].max += modVal;
                                    break;
                                case "sidebag":
                                    this.modifiers[modifier.affects].capacity += modVal;
                                    break;
                                default: break; 
                            }
                        });
                    }
                });
            };


            
            //listen for events that indicate modifiers have been changed
            $rootScope.$on('modifiers:changed', (evt) => { this.recalc(); });

            this.onModifiersChanged = function() {
                this.recalc();
            };
        }

    });


}) (angular);