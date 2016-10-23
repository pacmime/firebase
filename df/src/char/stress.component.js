(function(angular) {
    
    "use strict";



    class StressController {

        constructor () {
            
        }

        $onInit () {
            
        }

        resetStress () {
            angular.forEach(['physical','mental','social','hunger'], (type) => {
                var max = this.ngModel[type].threshold;
                var used = this.ngModel[type].used;
                for(var index=0; index<max; ++index) {
                    used[index] = false;
                }
            });
            this.onChange();
        }

        toggleStress (type, index) {
            this.ngModel[type].used[index] = !this.ngModel[type].used[index];
            this.onChange();
        }

    }



    angular.module("dresden.char").component("stress", {
        bindings: {
            ngModel: "=",
            onChange: "&"
        },
        templateUrl: 'char/stress.component.html',
        controller: StressController
    });

}) (angular);