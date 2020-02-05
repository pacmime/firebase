

export const Events = {
    ITEM_EDIT   : 'item.edit',
    ITEM_ADD    : 'item.added',
    ITEM_UPDATE : 'item.updated',
    ITEM_REMOVE : 'item.removed',
    ITEM_EQUIP  : 'item.equipped'
};

export type Slot = 'hat' | 'face' | 'shoulders' | 'coat' | 'torso' |
    'belt' |  'pants' |  'gloves' | 'boots';
export type Usage = "Turn" | "Fight" | "Adventure" | "Travel";


export interface Modifier {
    affects: string;
    value: number;
}

export interface Option {
    name   : string;
    value ?: any;
    desc  ?: string;
    description ?: string;
    modifiers ?: Modifier[];
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
    totalDmg : number;
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
    modifiers?: Modifier[];  //mods associated
    type?:      string;
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


export interface ElementalMagik extends Option {
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

export interface Ability extends Option {
    name:       string;
    desc?:      string; //on chosen abilities
    value?:     string; //on unchosen abilities
    requires?:  string; //name of required ability
    multi?:     boolean;    //choose more than once?
    disabled?:  boolean;    //able to be chosen?
    modifiers:  Modifier[]  //mods associated
    type?:      string; //type of ability (starting, etc)
    roll?:      string; //2d6 rolled to acquire upgrade ability
    userInput?: any;
    usage?:     Usage;
    used ?:     boolean;
}


export interface Item extends Option {
    name     : string;
    source   : string;
    slot     : Slot;
    description: string;
    keywords : string;
    usage   ?: Usage;
    modifiers: Modifier[];
    cost     : number;
    weight   : number;
    darkstone: number;
    hands    : number;
    slots    : number;
    equipped : boolean;
    used    ?: boolean;
}


export interface SOBCharacter {
    name        : string;
    class       : string;   //old version (now stores name)
    classId     : string;   //new version
    armor       : number;
    avatar?     : string;
    combat      : number;
    spiritArmor : number;
    cover?      : number;
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
    //Wandering Samurai / Samurai Warrior / Daimyo
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

    //Sorcerer
    elementalMagik? : ElementalMagik[];
    mana?: number;

    //Traveling Monk
    ki? : {
        current: number;
        max: number;
    };

    //Assassin / Trederran Veteran
    faction ?: any;

    //temporary modifiers
    temporaryMods?  : Modifier[],

    json ?: any
}














/*
These classes have some abilities like spells or custom trackable resources like faith
*/
export enum SPECIAL_CLASSES {
    PREACHER, SHAMAN, SAMURAI, GAMBLER, ORPHAN, MONK, SORCERER, ASSASSIN, TREDERRAN_VETERAN
};

const CLASS_FLAGS = {};

CLASS_FLAGS[SPECIAL_CLASSES.PREACHER] = {
    value: 1,
    fn: (char:SOBCharacter) => { return 'Preacher'===char.class; },
    init: (char:SOBCharacter) => { char.sermons = char.sermons || []; }
};
CLASS_FLAGS[SPECIAL_CLASSES.SHAMAN] = {
    value: 2,
    fn: (char:SOBCharacter) => { return 'Dark Stone Shaman'===char.class; },
    init: (char:SOBCharacter) => { char.spells = char.spells || []; }
};
CLASS_FLAGS[SPECIAL_CLASSES.SAMURAI] = {
    value: 4,
    fn: (char:SOBCharacter) => { return ['Wandering Samurai', 'Daimyo', 'Samurai Warrior'].indexOf(char.class)>=0; },
    init: (char:SOBCharacter) => { char.tactics = char.tactics || []; }
};
CLASS_FLAGS[SPECIAL_CLASSES.GAMBLER] = {
    value: 8,
    fn: (char:SOBCharacter) => { return 'Gambler'===char.class; },
    init: (char:SOBCharacter) => { char.tricks = char.tricks || []; }
};
CLASS_FLAGS[SPECIAL_CLASSES.ORPHAN] = {
    value: 16,
    fn: (char:SOBCharacter) => { return 'Orphan'===char.class; },
    init: (char:SOBCharacter) => { char.missions = char.missions || []; }
};
CLASS_FLAGS[SPECIAL_CLASSES.MONK] = { value: 32, fn: (char:SOBCharacter) => { return 'Traveling Monk'===char.class; } };
CLASS_FLAGS[SPECIAL_CLASSES.SORCERER] = {
    value: 64,
    fn: (char:SOBCharacter) => { return 'Sorcerer'===char.class; },
    init: (char:SOBCharacter) => { char.elementalMagik = char.elementalMagik || []; }
};
CLASS_FLAGS[SPECIAL_CLASSES.ASSASSIN] = {
    value: 128,
    fn: (char:SOBCharacter) => { return 'Assassin'===char.class; }
};
CLASS_FLAGS[SPECIAL_CLASSES.TREDERRAN_VETERAN] = {
    value: 256,
    fn: (char:SOBCharacter) => { return 'Trederran Veteran'===char.class; }
};


/**
 *
 */
export class ClassFlag {

    private flag : number = 0;

    constructor( char : SOBCharacter ) {
        Object.keys(CLASS_FLAGS).forEach( key => {
            let flag = CLASS_FLAGS[key];
            if( flag.fn(char) ) {
                this.applyFlag(flag.value);
                if(typeof(flag.init) !== 'undefined') {
                    flag.init(char);
                }
            }
        });
    }

    applyFlag(flag : number) : void { this.flag |= flag; }

    removeFlag(flag : number) : void { this.flag &= ~flag; }

    hasFlag(flag : number) : boolean { return (this.flag & flag) > 0; }

    hasSpecialClass(cls : SPECIAL_CLASSES) : boolean {
        if( cls !== null && typeof(cls) !== 'undefined' && CLASS_FLAGS[cls]) {
            return this.hasFlag(CLASS_FLAGS[cls].value);
        }
        return false;
    }
}
