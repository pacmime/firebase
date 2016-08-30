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
            };

            this.getAvailableSidebagCapacity = function() {
                if(!this.sidebag) return 0;
                
                var carrying = 0;
                for(var i=0; i<this.options.length; ++i) {
                    carrying += this.sidebag[this.options[i]] || 0;
                }
                
                return this.sidebag.capacity - carrying;
                
            };


        }

    });

}) (angular);