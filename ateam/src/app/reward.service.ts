
import { Injectable } from "@angular/core";
import { Subject, Subscription } from 'rxjs';
import { Reward, RewardTypes, RewardTypeLabels } from './models';

@Injectable()
export class RewardsService {

    private _rewards : Reward[] = [];
    private _subject : Subject<Reward[]> = new Subject<Reward[]>();


    constructor() {

    }

    subscribe( callback : any ) : Subscription {
        return this._subject.subscribe(callback);
    }


    add( arg : Reward ) {

        //dupe input object
        let reward = arg.clone();

        if(RewardTypes.Slot === reward.type) {
            //generate random die value for reward
            reward.value = Math.ceil((Math.random()*5000)/1000)+1;
        }


        if(RewardTypes.Slot !== reward.type && !isNaN(reward.value) && reward.value > 1) {
            while(reward.value > 0) {
                this._rewards.push(new Reward(reward.type));
                reward.value--;
            }

        } else {
            this._rewards.push(reward);
        }

        let label = reward.label;
        console.log(`RewardService.add() - Added '${label}' reward`);
        console.log(`RewardService.add() - now has ${this._rewards.length} rewards`);
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
