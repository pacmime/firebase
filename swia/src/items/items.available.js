(function(angular) {
    
    "use strict";

    angular.module("items", ['ngSanitize', "common"]).component("swiaAvailableItems", {
        
        bindings: {
            credits: "@",
            onPurchase: "&"
        },

        templateUrl: 'src/items/items.available.html',

        controller: function(ItemChoices) {

            this.$onInit = function() {

                ItemChoices.$loaded().then( () => {
                    this.items = angularFireCopy(ItemChoices);
                });

            };

            this.purchase = function(item) {
                this.onPurchase({item: item});
            };
        }
    });

}) (angular);