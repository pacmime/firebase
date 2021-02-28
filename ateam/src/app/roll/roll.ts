
import { Team, Reward, RewardTypes, RewardTypeLabels } from '../models';

//each member rolls 1 die per team member
// but only gets a special if their specific die result is a 6
export const DieTypes = {
    Hannibal : Team.Hannibal+'',
    Faceman  : Team.Faceman+'',
    BA       : Team.BA+'',
    Murdock  : Team.Murdock+''
}

const DieRewards = {};
DieRewards[Team.Hannibal] = {
    1: RewardTypes.Penalty,
    2: RewardTypes.None,
    3: RewardTypes.Damage,
    4: RewardTypes.Damage,
    5: RewardTypes.Part,
    6: RewardTypes.Tracker
};
DieRewards[Team.Faceman] = {
    1: RewardTypes.Penalty,
    2: RewardTypes.None,
    3: RewardTypes.Damage,
    4: RewardTypes.Damage,
    5: RewardTypes.Part,
    6: RewardTypes.Part
};
DieRewards[Team.BA] = {
    1: RewardTypes.Penalty,
    2: RewardTypes.None,
    3: RewardTypes.Damage,
    4: RewardTypes.Part,
    5: RewardTypes.Part,
    6: RewardTypes.Defeat
};
DieRewards[Team.Murdock] = {
    1: RewardTypes.Penalty,
    2: RewardTypes.None,
    3: RewardTypes.Damage,
    4: RewardTypes.Damage,
    5: RewardTypes.Part,
    6: RewardTypes.Defeat
};

/** */
export class Die {

    private _used : boolean = false;
    private _selected : boolean;
    private _reward : Reward;
    private _special : boolean = false;

    constructor(
        private _member : any,
        private _type : string,
        private _value : number
    ) {
        this.process();
    }

    get type () : string      { return this._type;     }
    get typeId () : string      { return this._type.replace(/\s/g,'').toLowerCase(); }

    get value () : number     { return this._value;    }
    set value (v:number)      {
        this._value = v;
        this.process(); //if value changes, evaluate any benefits
    }
    get used () : boolean     { return this._used;     }
    set used (v:boolean)      { this._used = v;        }
    get selected () : boolean { return this._selected; }
    set selected (v:boolean)  { this._selected = v;    }
    get reward () : Reward    { return this._reward;   }
    get special() : boolean   { return this._special;  }
    get member() : string     { return this._member;   }
    get memberId() : string   { return this._member.replace(/\s/g,'').toLowerCase(); }


    process() {
        let rewardType = RewardTypes.None;
        let reward = null;

        if(this._value === 6 && this._member === this.type) {
            reward = this.determineSpecial();
        } else {
            rewardType = DieRewards[this._member][this._value];
            reward = new Reward(rewardType);
        }

        this._reward = reward;
    }

    determineSpecial() : Reward {
        let rewardType = RewardTypes.None;
        let rewardValue = 0;
        this._special = true;
        switch(this.type) {
            case DieTypes.Hannibal :
            rewardType = RewardTypes.Tracker;
            rewardValue = 2;
            break;

            case DieTypes.Faceman  :
            rewardType = RewardTypes.Die;
            break;

            case DieTypes.BA       :
            rewardType = RewardTypes.Part;
            rewardValue = 2;
            break;

            case DieTypes.Murdock  :
            rewardType = RewardTypes.DieFace;
            break;
        }
        return new Reward(rewardType, rewardValue);
    }

}



/**
 *
 */
export class Roll {

    private _hasPair   : boolean = false;
    private _hasTriple : boolean = false;
    private _hasQuad   : boolean = false;
    private _results   : Die[] = [];
    private _groupUsed : boolean = false;

    public get results() : Die[] { return this._results; }
    public get hasPair() : boolean { return this._hasPair; }
    public get hasTriple() : boolean { return this._hasTriple; }
    public get hasQuad() : boolean { return this._hasQuad; }
    public get groupUsed() : boolean { return this._groupUsed; }
    public set groupUsed(v:boolean) { this._groupUsed = v; }

    constructor( private member : any ) {}

    public roll() {
        for(let i=0; i<4; ++i) {
            let val = Math.ceil(Math.random()*6);
            let type = i==0 ? DieTypes.Hannibal :
                       i==1 ? DieTypes.Faceman :
                       i==2 ? DieTypes.BA :
                              DieTypes.Murdock;
            this._results[i] = new Die(this.member, type, val);
        }

        this.groupUsed = false;
        this.check();
    }

    public check() {
        if(this.groupUsed) return;    //ignore if already used

        this._hasPair = this.hasCount(2);
        this._hasTriple = this.hasCount(3);
        this._hasQuad = this.hasCount(4);
    }

    private hasCount( min : number ) : boolean {
        for(let i=1; i<=6; ++i) {
            let count = this._results.filter(r=> r.value === i && !r.used).length;
            if(count >= min) return true;
        }
        return false;
    }

    /** has all dice in this roll been allocated? */
    public allUsed() : boolean {
        return !this.results.find(d=>!d.used);
    }

    public getFails() : number {
        return this._results.filter(r=> r.value === 1 && !r.used).length;
    }

}
