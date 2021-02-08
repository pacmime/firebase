
import { Injectable } from "@angular/core";
import { Subject, Subscription } from 'rxjs';

export enum RewardTypes {
    Damage,
    Defeat,
    Part,
    Tracker,
    Slot,
    DieFace
}
export interface Reward {
    type   : RewardTypes;
    value ?: number;
    label ?: string;
}

@Injectable()
export class RewardsService {

    private _rewards : Reward[] = [];
    private _subject : Subject<Reward[]> = new Subject<Reward[]>();


    constructor() {

    }

    subscribe( callback : any ) : Subscription {
        return this._subject.subscribe(callback);
    }


    add( reward : Reward ) {

        //dupe input object
        reward = Object.assign({}, reward);

        if(RewardTypes.Slot === reward.type) {
            //generate random die value for reward
            reward.value = Math.ceil((Math.random()*6000)/1000);
        }

        if(RewardTypes.Damage === reward.type &&
            reward.value && reward.value > 1) {
            while(reward.value > 0) {
                this._rewards.push({ type: reward.type, label: reward.label, value: 1 });
                reward.value--;
            }

        } else {
            this._rewards.push(reward);
        }

        this._subject.next();
    }

    has( type : RewardTypes, value : number = -1 ) : boolean {
        return this._lookUp(type, value) >= 0;
    }

    get( type: RewardTypes, value : number = -1 ) : Reward {
        let idx = this._lookUp(type, value);
        if(idx >= 0) {
            let removed = this._rewards.splice(idx, 1);
            this._subject.next();
            return removed[0];
        }
        return null;
    }

    list() : Reward[] {
        return this._rewards;
    }

    clear() {
        this._rewards = [];
        this._subject.next();
    }

    _lookUp( type: RewardTypes, value : number = -1 ) : number {
        return this._rewards.findIndex( r => {
            return r.type === type && (value < 0 || r.value >= value);
        });
    }

}
