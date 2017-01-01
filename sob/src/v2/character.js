(function(angular) {
    
    "use strict";

    var app = angular.module("sob-character", ['ngSanitize', 'ui.bootstrap', "firebase", 'sob-common']);


    app.component('character', {

        templateUrl: 'src/v2/character.html',
        replace: true,

        controller: function($routeParams, $timeout, CharacterRef, ClassHelper) {
        
            var self = this;
            
            this.displayOpts = {
                loading: true,
                message: null,
                error: null
            };

            this.panel="char";

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
                });

            };

        }

    });


}) (angular);