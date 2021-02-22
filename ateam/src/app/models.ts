
export enum Modes {
    Intro,
    Plan,
    Showdown,
    End
};

export const Difficulties = {
    Normal : 4,
    Hard   : 6,
    Elite  : 8
};


export const Team = {
    Hannibal : "Hannibal",
    Faceman  : "Faceman",
    BA       : "BA Barrakas",
    Murdock  : "Murdock"
};

export enum RewardTypes {
    Damage,
    Defeat,
    Part,
    Tracker,
    Slot,
    DieFace,
    None,       //no benefit
    Penalty     //if die is actually a punishment
}
export const RewardTypeLabels = {};
RewardTypeLabels[RewardTypes.Damage]  = "Damage a Henchman";
RewardTypeLabels[RewardTypes.Defeat]  = "Defeat a Henchman";
RewardTypeLabels[RewardTypes.Part]    = "Draw a Part";
RewardTypeLabels[RewardTypes.Tracker] = "Decrease Lynch Tracker";
RewardTypeLabels[RewardTypes.Slot]    = "Slot a die w/o restriction";
RewardTypeLabels[RewardTypes.DieFace] = "Change one die face value";
RewardTypeLabels[RewardTypes.None]    = "No reward";
RewardTypeLabels[RewardTypes.Penalty] = "Increase Lynch Tracker";

export const RewardTypeIcons = {};
RewardTypeIcons[RewardTypes.Damage]  = "fas fa-bahai";
RewardTypeIcons[RewardTypes.Defeat]  = "fas fa-skull-crossbones";
RewardTypeIcons[RewardTypes.Part]    = "fas fa-vector-square";
RewardTypeIcons[RewardTypes.Tracker] = "fas fa-user-shield t-good";
RewardTypeIcons[RewardTypes.Slot]    = "fas fa-dice-d6";
RewardTypeIcons[RewardTypes.DieFace] = "fas fa-dice";
RewardTypeIcons[RewardTypes.None]    = "fas fa-ban";
RewardTypeIcons[RewardTypes.Penalty] = "fas fa-user-shield t-bad";


export class Reward {

    public _value : number;
    public _label : string;
    public _icon : string;

    constructor( private _type: RewardTypes, value ?: number ) {
        this._label = RewardTypeLabels[_type];
        this._icon = RewardTypeIcons[_type];
        if(!isNaN(value)) {
            this._value = value;
        }
    }

    clone() : Reward {
        let result = new Reward(this._type, this._value);
        result.label = this.label;
        result.icon = this.icon;
        return result;
    }

    get type() : RewardTypes { return this._type; }

    get value() : number { return this._value; }
    set value(v:number) { this._value = v; }

    get label() : string { return this._label; }
    get icon () : string { return this._icon;  }

    set label(v:string) { this._label = v; }
    set icon(v:string) { this._icon = v; }

}
