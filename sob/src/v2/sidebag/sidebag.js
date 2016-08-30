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
                "bandages",
                "whiskey",
                "tonic",
                "herbs",
                "dynamite",
                "flash",
                "fungus",
                "spices", 
                "potions", 
                "hatchets",
                "lanternOil",
                "exoticHerbs", 
                "tequila",
                "cigars",
                "shatterGrenade",
                "antiRad"
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
                    carrying += this.sidebag[option] || 0;
                }
                
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