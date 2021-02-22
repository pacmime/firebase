import { Roll } from "../roll";
import { Reward, RewardTypes, RewardTypeLabels } from '../models';


export const ATEAM = {

    Hannibal : {
        special : {
            reward: { label: RewardTypeLabels[RewardTypes.Defeat], type: RewardTypes.Defeat }
        }
    },
    Faceman : {
        special : {
            reward: { label: RewardTypeLabels[RewardTypes.Slot], type: RewardTypes.Slot }
        }
    },
    BA : {
        special : {
            reward: { label: RewardTypeLabels[RewardTypes.Part], type: RewardTypes.Part }
        }
    },
    Murdock : {
        special : {
            reward: { label: RewardTypeLabels[RewardTypes.DieFace], type: RewardTypes.DieFace }
        }
    }
}
