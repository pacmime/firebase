(function(angular) {
    
    "use strict";

    angular.module('sob-character').component('sidebag', {

        bindings: {
            sidebag: '=',
            onSave: '&'
        },

        templateUrl: 'src/v2/sidebag/sidebag.html',
        replace: true,

        controller: function() {

            this.options = [
                {label:"bandages", description: "discard to heal D6 wounds from yourself or adjacent hero"},
                {label:"whiskey", description: "discard to heal D6 sanity from yourself or adjacent hero"},
                {label:"tonic", description: "discard to gain 1 grit"},
                {label:"herbs", description: "discard to heal 2D6 wounds from yourself or adjacent hero"},
                {label:"dynamite", description: "ranged attack; range: strength +3, does D6 wounds ignoring defense to each model in same and adjacent spaces"},
                {label:"flash", description: "discard to make all enemies -2 initiative until the end of the turn"},
                {label:"fungus", description: "discard to heal D6 wounds and D6 sanity from yourself or adjacent hero"},
                {label:"spices",  description: "discard to add D3 damage to one hit and gain 1 wound ignoring defense"},
                {label:"potions",  description: "discard to add +2 to one of your skills until end of the turn"},
                {label:"hatchets", description: "free ranged attack; range strength +3, shots 1, +2 damage. uses melee to hit"},
                {label:"lanternOil", description: "discard to re-roll one of the hold back the darkness dice"},
                {label:"exoticHerbs",  description: "discard to remove D3 corruption points"},
                {label:"tequila", description: "discard to heal 2D6 sanity from yourself or adjacent hero"},
                {label:"cigars", description: "discard to gain armor 3+ until the end of the turn"},
                {label:"shatterGrenade", description: ""},
                {label:"antiRad", description: ""}
            ];


            this.save = function() {
                this.onSave();
                this.max = this.getAvailableSidebagCapacity();
            };

            this.getAvailableSidebagCapacity = function() {
                if(!this.sidebag) return 0;
                
                var carrying = 0;
                for(var i=0; i<this.options.length; ++i) {
                    var option = this.options[i];
                    carrying += this.sidebag[option.label] || 0;
                }
                console.log("Carrying: " + carrying);
                this.carrying = carrying;
                return this.sidebag.capacity - carrying;
                
            };

            this.increase = function(option) {
                if(this.getAvailableSidebagCapacity() < 1) return;

                var value = this.sidebag[option] || 0;
                value += 1;
                this.sidebag[option] = value;
                this.save();
            };

            this.decrease = function(option) {
                var value = this.sidebag[option] || 0;
                if(value > 0) {
                    value -= 1;
                    this.sidebag[option] = value;
                    this.save();
                }
            };

            this.$onInit = function() {
                this.max = this.getAvailableSidebagCapacity();
            };

        }

    });

}) (angular);