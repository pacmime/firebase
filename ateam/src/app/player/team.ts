import { Roll } from "../roll";
import { Reward, RewardTypes } from '../reward.service';


export const ATEAM = {

    Hannibal : {
        special : {
            reward: { label: "Defeat Henchmen", type: RewardTypes.Defeat }
        },
        pair    : {
            description: "Deal damage to henchmen",
            action: function(roll : Roll) {
                //apply X/2 to HENCHMEN
            }
        },
        triple    : {
            description: "Add PARTS card",
            action: function(roll : Roll) {
                //draw random parts card and add
            }
        },
        quad    : {
            description: "Defeat Henchmen",
            action: function(roll : Roll) {
                //remove random HM
            }
        },
        straight : {
            description: "???",
            action: function(roll : Roll) {

            }
        }
    },
    Faceman : {
        special : {
            reward: { label: "Slot a die without restriction", type: RewardTypes.Slot }
        },
        pair    : {
            description: "Deal damage to henchmen",
            action: function(roll : Roll) {
                //apply X/2 to HENCHMEN
            }
        },
        triple    : {
            description: "Add PARTS card",
            action: function(roll : Roll) {
                //draw random parts card and add
            }
        },
        quad    : {
            description: "Defeat Henchmen",
            action: function(roll : Roll) {
                //remove random HM
            }
        },
        straight : {
            description: "???",
            action: function(roll : Roll) {

            }
        }
    },
    BA : {
        special : {
            reward: { label: "Add Part", type: RewardTypes.Part }
        },
        pair    : {
            description: "Deal damage to henchmen",
            action: function(roll : Roll) {
                //apply X/2 to HENCHMEN
            }
        },
        triple    : {
            description: "Add PARTS card",
            action: function(roll : Roll) {
                //draw random parts card and add
            }
        },
        quad    : {
            description: "Defeat Henchmen",
            action: function(roll : Roll) {
                //remove random HM
            }
        },
        straight : {
            description: "???",
            action: function(roll : Roll) {

            }
        }
    },
    Murdock : {
        special : {
            reward: { label: "Change face value of one die", type: RewardTypes.DieFace }
        },
        pair    : {
            description: "Deal damage to henchmen",
            action: function(roll : Roll) {
                //apply X/2 to HENCHMEN
            }
        },
        triple    : {
            description: "Add PARTS card",
            action: function(roll : Roll) {
                //draw random parts card and add
            }
        },
        quad    : {
            description: "Defeat Henchmen",
            action: function(roll : Roll) {
                //remove random HM
            }
        },
        straight : {
            description: "???",
            action: function(roll : Roll) {

            }
        }
    }
}
