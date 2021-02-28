
import { Henchmen } from '../henchmen/henchmen';
import { Slot } from '../slot/slot';
import { Reward, RewardTypes, RewardTypeLabels } from '../models';

const NAMES = [
    "Repair Shop",
    "Restaurant",
    "Amusement Park",
    "Recording Studio",
    "Sheriff's Office",
    "Forest",
    "Mountains",
    "Circus",
    "Movie Set",
    "Construction Site"
];


const REWARDS : Reward[] = [
    new Reward(RewardTypes.Defeat),
    new Reward(RewardTypes.Part),
    new Reward(RewardTypes.Part),
    new Reward(RewardTypes.Tracker),
    new Reward(RewardTypes.Part),
    new Reward(RewardTypes.Part),
    new Reward(RewardTypes.Defeat),
    new Reward(RewardTypes.Part),
    new Reward(RewardTypes.Part),
    new Reward(RewardTypes.Damage, 3),
    new Reward(RewardTypes.Defeat),
    new Reward(RewardTypes.Die),
    new Reward(RewardTypes.Part),
    new Reward(RewardTypes.Part)
];

export class Location {

    private _slots : Slot[] = [];
    private _henchmen : Henchmen[] = [];
    private _complete : boolean = false;

    constructor(
        private _name : string,
        private _reward : Reward,
        private numSlots : number = 3,
        private maxHenchmen : number = 3
    ) {

        for(let i=0; i<numSlots; ++i) {
            let dc = Math.ceil(Math.random()*6);
            let slot = new Slot(dc);
            this._slots.push(slot);
        }

        for(let j=0; j<maxHenchmen; ++j) {
            this.addHenchmen();
        }
    }

    public get name() : string { return this._name; }
    public get slots() : Slot[] { return this._slots; }
    public get reward() : Reward { return this._reward; }
    public get complete() : boolean { return this._complete; }
    public set complete( val : boolean) { this._complete = val; }
    public get henchmen() : Henchmen[] { return this._henchmen; }

    public removeHenchmen(henchmen : Henchmen) {
        let idx = this._henchmen.findIndex(h=>h===henchmen);
        if(idx >= 0) {
            this._henchmen.splice(idx, 1);
        }
    }

    public refillHenchmen() {
        while( this._henchmen.length < this.maxHenchmen ) {
            this.addHenchmen();
        }
    }

    private addHenchmen() {
        let hp = Math.ceil((Math.random()*3000/1000));
        this._henchmen.push(new Henchmen(hp));
    }

}


export function LocationFactory() {
    let name   = NAMES[Math.floor( Math.random() * NAMES.length )];
    let reward = REWARDS[Math.floor( Math.random() * REWARDS.length )];
    return new Location(name, reward);
}
