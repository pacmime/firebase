(function(angular) {
    
    "use strict";



    class AspectsController {

        constructor () {
            this.editing = {};
            this.cache = {};
        }

        $onInit () {
            
        }

        edit (aspect) {
            this.editing[aspect] = true;
            this.cache[aspect] = this.ngModel.aspects[aspect];
        }

        saveChanges (aspect) {
            this.onChange();    //trigger save
            this.editing[aspect] = false;
            this.cache[aspect] = null;
        }

        abortChanges (aspect) {
            this.editing[aspect] = false;
            this.ngModel.aspects[aspect] = this.cache[aspect];
            this.cache[aspect] = null;
        }

    }



    angular.module("dresden.char").component("aspects", {
        bindings: {
            ngModel: "=",
            onChange: "&"
        },
        templateUrl: 'char/aspects.component.html',
        controller: AspectsController
    });

}) (angular);