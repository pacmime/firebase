(function(angular) {
    
    "use strict";



    class PowersController {

        constructor () {
            
        }

        $onInit () {
            this.displayOpts = {};
        }

        removePower (name) {
            this.ngModel[name] = null;
            this.onChange();
        }


        showEditor () {
            this.newPower = {
                name: "",
                cost: 0,
                misc: ""
            };
            this.displayOpts.showEditor = true;
        }

        addPower () {
            this.ngModel = this.ngModel || {};
            this.ngModel[this.newPower.name] = this.newPower;
            this.onChange();
            this.hideEditor();
        }
        
        hideEditor () {
            this.newPower = null;
            this.displayOpts.showEditor = false;
        }

    }



    angular.module("dresden.char").component("powers", {
        bindings: {
            ngModel: "=",
            onChange: "&"
        },
        templateUrl: 'char/powers.component.html',
        controller: PowersController
    });

}) (angular);