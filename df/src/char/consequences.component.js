(function(angular) {
    
    "use strict";



    class ConsequencesController {

        constructor () {
            
        }

        $onInit () {
            this.displayOpts = {};
        }

        getConsequences () {
            var result = [];
            if(this.ngModel) {
                for(var aspect in this.ngModel) {
                    result.push(this.ngModel[aspect]);
                }
            }
            return result.sort(function(a,b) {
                if(a.type === b.type) return a.aspect < b.aspect;
                else if(a.type === 'mild') return -1;
                else if(b.type === 'mild') return 1;
                else if(a.type === 'moderate') return -1;
                else if(b.type === 'moderate') return 1;
                else if(a.type === 'severe') return -1;
                else if(b.type === 'severe') return 1;
                return 0;
            });
        }

        removeConsequence (consq) {
            if(consq) {
                this.ngModel[consq.aspect] = null;
                this.onChange();
            }
        }

        showConsequenceEditor () {
            this.newConsequence = {
                aspect: "",
                type: "mild",
                modifier: -2
            };
            this.displayOpts.showConsequenceEditor = true;
        }

        addConsequence () {
            this.ngModel = this.ngModel || {};
            this.ngModel[this.newConsequence.aspect] = this.newConsequence;
            this.onChange();
            this.hideConquenceEditor();
        }
        
        hideConquenceEditor () {
            this.newConsequence = null;
            this.displayOpts.showConsequenceEditor = false;
        }

        updateNewConsequenceModifier () {
            var type = this.newConsequence.type;
            var mod = 'mild' === type ? -2 : ( 'moderate' === type ? -4 : ( 'severe' === type ? -6 : -8 ) );
            this.newConsequence.modifier = mod;
        }

    }



    var app = angular.module("dresden.char").component("consequences", {
        bindings: {
            ngModel: "=",
            onChange: "&"
        },
        templateUrl: 'char/consequences.component.html',
        controller: ConsequencesController
    });

}) (angular);