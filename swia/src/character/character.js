(function(angular) {
    
    "use strict";

    var app = angular.module("character", ['ngSanitize', "firebase"]);

    app.filter('colorize', function($sce) {
        return function(input) {
            var html = "";
            if(input) {
                html = input.replace(/black/gi, '<div class="color-icon black"></div>')
                            .replace(/blue/gi, '<div class="color-icon blue"></div>')
                            .replace(/green/gi, '<div class="color-icon green"></div>')
                            .replace(/red/gi, '<div class="color-icon red"></div>')
                            .replace(/white/gi, '<div class="color-icon white"></div>')
                            .replace(/yellow/gi, '<div class="color-icon yellow"></div>');
            }
            return $sce.trustAsHtml(html);
        };
    });

    app.factory("Character", ["$firebaseObject",
        function($firebaseObject) {
            return function(campaign, character) {
                var ref = new Firebase("https://intense-fire-8692.firebaseio.com/saved/" + campaign + "/" + character);
                return $firebaseObject(ref);
            }
        }
    ]);

    app.factory("CharacterInfo", ["$firebaseArray",
        function($firebaseArray) {
            var ref = new Firebase("https://intense-fire-8692.firebaseio.com/base/characters");
            return $firebaseArray(ref);
        }
    ]);


    app.controller("CharacterController", [
        "$scope", "$routeParams", "$compile", "Character", "CharacterInfo",
        function($scope, $routeParams, $compile, Character, CharacterInfo) {
        
        var self = this;
        
        this.displayOpts = {
            loading: true,
            message: null,
            error: null
        };

        //load the campaign
        var campName = decodeURIComponent($routeParams.campId);
        var charName = decodeURIComponent($routeParams.charId);
        this.character = Character(campName, charName);
        this.character.$loaded().then(function() {

            //load base information
            CharacterInfo.$loaded().then(function() {
                self.baseData = CharacterInfo.find(function(c){return c.name === self.character.name;});
                self.displayOpts.loading = false;

            }).catch(function(error) {
                self.displayOpts.loading = false;
                self.displayOpts.error = error.data;
            });

        }).catch(function(error) {
            self.displayOpts.loading = false;
            self.displayOpts.error = error.data;
        });


        function getAbilityCost(ability) {
            return ability.cost.replace(/\s*xp\s*/i, '')*1;
        }


        //
        this.increaseXP = function() {
            this.character.xp += 1;
            this.character.$save();
        };


        //@return true|false or string message if false
        this.canPurchase = function(ability) {
            if(this.character.xp < getAbilityCost(ability)) return false;

            return !this.character.abilities || 
                !this.character.abilities.find(function(a) {return a.name === ability.name;});
        };

        this.hasEnoughXP = function(ability) {
            if(this.character.xp >= getAbilityCost(ability)) return "";
            else "Insufficent XP"
        }


        //
        this.purchaseAbility = function(ability) {
            this.character.abilities = this.character.abilities || [];
            this.character.abilities.push(angular.copy(ability));
            this.character.xp -= getAbilityCost(ability);
            this.character.$save();
            this.displayOpts.displayPicker = false;
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

    }]);


    angular.module('character').directive("abilities", function() {

        return {
            restrict: "AE",
            templateUrl: 'src/character/abilities.html', 
            link: function($scope, $element) {



            }
        };

    });

}) (angular);