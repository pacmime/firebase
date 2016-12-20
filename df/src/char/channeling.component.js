(function(angular) {
    "use strict";

    class ChannelController {

        constructor () {}

        $onInit () {}

        apply () {

            var max = this.ngModel.stress.mental.threshold;
            var conviction = this.getConviction();
            var shifts = this.shifts;    
            var stress = this.shifts - conviction;
            if(stress <= 0) {
                //check first available mental stress box
                var idx = 0;
                for(;idx < max; ++idx) {
                    if(!this.ngModel.stress.mental.used[idx]) {
                        this.ngModel.stress.mental.used[idx] = true;
                        return;
                    }
                }
                
            } else {
                
                var consqMod = 0;

                if(stress > max) {
                    consqMod = stress - max;
                    stress = max;
                }

                var idx = stress-1; //start at first box capable of meeting our need for cost
                for(;idx < max; ++idx) {
                    if(!this.ngModel.stress.mental.used[idx]) {
                        this.ngModel.stress.mental.used[idx] = true;
                        return;
                    }
                }
                
                //if we reached here, we don't have stress boxes to cover the cost, so more consequences maybe
                if(stress > 1) {
                    for(idx=stress-2; idx>=0; --i) {
                        consqMod++;
                        if(!this.ngModel.stress.mental.used[idx]) {
                            this.ngModel.stress.mental.used[idx] = true;
                            alert("Please add a consequence with a modifier of " + consqMod);
                            return;
                        }
                    }
                }
            }

            //if we reached here, all boxes were already checked!
            alert("No stress boxes available to use!");

        }

        getConviction () {
            var skills = this.ngModel.skills;
            if((skills.superb.choices||"").toLowerCase().indexOf("conviction")) return 5;
            else if((skills.great.choices||"").toLowerCase().indexOf("conviction")) return 4;
            else if((skills.good.choices||"").toLowerCase().indexOf("conviction")) return 3;
            else if((skills.fair.choices||"").toLowerCase().indexOf("conviction")) return 2;
            else if((skills.average.choices||"").toLowerCase().indexOf("conviction")) return 1;
            else return 0;
        }
    }

})(angular);