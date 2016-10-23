(function(angular) {
    
    "use strict";



    class SkillsController {

        constructor () {
            
        }

        $onInit () {
            
        }


        getSkillSlots (group) {
            if(!this.ngModel || !this.ngModel[group])
                return 0;
            var skills = this.ngModel[group].choices;
            if(!skills || !skills.length) return 0;
            return skills.split(',').length;
        }

        /**
         * @return true if not valid!
         */
        validateSpent () {
            if(!this.ngModel) return false;
            var spent = 
                this.getSkillSlots('average') + this.getSkillSlots('fair') + 
                this.getSkillSlots('good') + this.getSkillSlots('great') + 
                this.getSkillSlots('superb');
            return spent > this.ngModel.total;
        }

        /**
         * @return true if not valid!
         */
        validate (group) {
            if(!this.ngModel) return false;
            
            switch(group) {
                case 'superb': 
                    return this.getSkillSlots('superb') > this.getSkillSlots('great');
                case 'great': 
                    return this.getSkillSlots('great') > this.getSkillSlots('good');
                case 'good': 
                    return this.getSkillSlots('good') > this.getSkillSlots('fair');
                case 'fair': 
                    return this.getSkillSlots('fair') > this.getSkillSlots('average');
            }
            return false;   //valid
        }

    }



    angular.module("dresden.char").component("skills", {
        bindings: {
            ngModel: "=",
            onChange: "&"
        },
        templateUrl: 'char/skills.component.html',
        controller: SkillsController
    });

}) (angular);