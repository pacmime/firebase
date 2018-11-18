


export interface Modifier {
    affects: string;
    value: number;
}

export interface Option {
    name: string;
}


export type AttackType = 'melee' | 'ranged' | 'dynamite' | 'hatchet';

export interface Attack extends Option {
    attack  : string;
    damage  : string;
    description : string;
    name    : string;
    toHit   : string;
    type    : AttackType;
    range   ?: string;
}

export interface AttackRoll {
    attack  : string;
    hits    : any[];
    dmg     : any[];
    bounces : any[];
}

export interface AttackDetails {
    numAttDie: number;
    attDie: number;
    attMod: number;
    dmgDie: number;
    dmgMod: number;
    target: number;
    range: number;
}


export interface Sermon extends Option {
    name: string;
    deadly? : boolean;
    type: string;
    desc: string;
    check: string;
    range: string;
    cost: number;
    xp : number;
    status?: any;
}

export interface OrphanMission extends Option {
    name:       string;
    desc?:      string; //on chosen abilities
    disabled?:  boolean;    //able to be chosen?
    modifiers?:  Modifier[]  //mods associated
}

export interface SamuraiTactic extends Option {
    name:       string;
    desc?:      string; //on chosen abilities
    cost?:      number;
    disabled?:  boolean;    //able to be chosen?
    modifiers?:  Modifier[]  //mods associated
}

export interface GamblerTrick extends Option {
    name:       string;
    desc?:      string; //on chosen abilities
    cost?:      number;
    disabled?:  boolean;    //able to be chosen?
    modifiers?:  Modifier[]  //mods associated
}

export interface ShamanSpell extends Option {
    name:       string;
    desc?:      string; //on chosen abilities
    power?:     number;
    disabled?:  boolean;    //able to be chosen?
    modifiers?:  Modifier[];  //mods associated
    xp?:        number;
}

export interface Ability extends Option {
    name:       string;
    desc?:      string; //on chosen abilities
    value?:     string; //on unchosen abilities
    requires?:  string; //name of required ability
    multi?:     boolean;    //choose more than once?
    disabled?:  boolean;    //able to be chosen?
    modifiers:  Modifier[]  //mods associated
}

export type Slot = 'hat' | 'face' | 'shoulders' | 'coat' | 'torso' |
    'belt' |  'pants' |  'gloves' | 'boots';
export type Usage = "Turn" | "Fight" | "Adventure";

export interface Item extends Option {
    name: string;
    source: string;
    slot: Slot;
    description: string;
    keywords: string;
    usage?: Usage;
    modifiers: Modifier[];
    cost: number;
    weight: number;
    darkstone: number;
    hands: number;
    slots: number;
    equipped: boolean;
}


export interface SOBCharacter {
    name        : string;
    class       : string;   //old version (now stores name)
    classId     : string;   //new version
    armor       : number;
    avatar?     : string;
    combat      : number;
    darkstone   : number;
    defense     : number;
    faith?      : number;
    init        : number;
    keywords    : string;
    level       : number;
    melee       : number;
    movement    : number;
    move?       : number;   //old value
    notes       : string;
    ranged      : number;
    spiritArmor : number;
    uid         : string;   //new version
    userId?     : string;   //old version
    version     : string;
    wealth      : number;
    willpower   : number;
    xp          : number;
    abilities   : Ability[];
    items       : Item[];
    mutations   : any[];
    attacks     : Attack[];
    sidebag     : any;
    corruption  : {
        current : number;
        max     : number;
    };
    grit        : {
        current : number;
        max     : number;
    };
    health      : {
        wounds  : number;
        max     : number;
    };
    sanity      : {
        loss    : number;
        max     : number;
    };
    stats       : {
        Agility : number;
        Cunning : number;
        Lore    : number;
        Luck    : number;
        Spirit  : number;
        Strength: number;
    };
    //Preacher
    sermons?    : Sermon[];
    //Dark Stone Shaman
    spells?     : ShamanSpell[];
    magik?      : {
        current : number;
        max     : number;
    };
    //Wandering Samurai
    tactics?    : SamuraiTactic[];
    fury?       : {
        current : number;
        max     : number;
    };
    //Gambler
    tricks?     : GamblerTrick[];
    fortune?    : {
        current : number;
        max     : number;
    };
    //Orphan
    missions?   : OrphanMission[];
}
