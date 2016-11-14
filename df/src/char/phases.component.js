(function(angular) {
    
    "use strict";



    class PhasesController {

        constructor () {
            this.editing = {
                background: {},
                story: {},
                conflict: {},
                guest1: {},
                guest2: {}
            };
            this.cache = {
                background: {},
                story: {},
                conflict: {},
                guest1: {},
                guest2: {}
            };
        }

        $onInit () {
            
        }

        edit (phase, property) {
            this.editing[phase][property] = true;
            this.cache[phase][property] = this.ngModel[phase][property];
        }

        saveChanges (phase, property) {
            this.onChange();    //trigger save
            this.editing[phase][property] = false;
        }

        abortChanges (phase, property) {
            this.editing[phase][property] = false;
            this.ngModel[phase][property] = this.cache[phase][property];
        }

    }



    angular.module("dresden.char").component("phases", {
        bindings: {
            ngModel: "=",
            onChange: "&"
        },
        templateUrl: 'char/phases.component.html',
        controller: PhasesController
    });

}) (angular);