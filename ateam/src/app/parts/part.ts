
import { Slot } from '../slot/slot';
import { Reward, RewardTypes } from '../reward.service';


const NAMES = [
    "Flamethrower",
    "Firehose",
    "Machine Guns",
    "Armor Plating",
    "Rockets",
    "Grenade Launcher",
    "Oil Slick",
    "Smoke",
    "Spiked Hubcaps"
];



export class Part {

    constructor(
        private _name : string,
        private _slot : Slot,
        private _reward : Reward,
        private _connectors : any = { top : false, bottom: false, left: false, right: false }
    ) {

    }

    public get name() : string { return this._name; }
    public get slot() : Slot { return this._slot; }
    public get reward() : Reward { return this._reward; }
    public get connectors() : any { return this._connectors; }

    coolDie() {
        if(this._slot) {
            this._slot.coolDie();
        }
    }
}


export class Frame extends Part {

    constructor() {
        super(null, null, null, {top:true, bottom: true, left: true, right:true});
    }
}

const MAX = 9999;
const FOUR_CONN = MAX * .1;
const THREE_CONN = MAX * .33;
const TWO_CONN = MAX * .66;

function random( max : number = MAX ) : number {
    return Math.floor( Math.random() * max );
}

function test( max : number, min : number ) : boolean {
    return random(max) > min;
}

function determineNumConnections() : number {
    let rand = random();
    let numConns = 1;
    if( rand < FOUR_CONN || rand > (MAX - FOUR_CONN) ) numConns = 4;
    else if( rand < THREE_CONN ) numConns = 3;
    else if( rand < TWO_CONN )   numConns = 2;
    return numConns;
}

function distributeConnections( numConns : number ) : any {
    if(numConns === 4) {
        return { top: true, bottom: true, left: true, right: true };
    }
    let sides = [false, false, false, false];   //top, right, bottom, left
    for(let i=0; i<numConns; ++i) {
        let side;
        do {
            side = random(4);
        } while( sides[side] === true );
        sides[side] = true;
    }
    return { top: sides[0], bottom: sides[1], left: sides[2], right: sides[3] };
}


const DAMAGE_LABEL = '<span class="fas fa-bahai"></span>';
function getLabel(dmg : number) : string {
    let result = '<span title="Deal ' + dmg + ' Damage">';
    for(let i=0; i<dmg; ++i) {
        result += DAMAGE_LABEL;
    }
    result += '</span>';
    return result;
}



export function PartFactory() {

    let numConns = determineNumConnections();
    let connectors = distributeConnections(numConns);

    let dc = random(6), dmg = 1 + (dc-2); //higher DCs do more damage
    dmg -= Math.max(0, numConns-2);       //more connections lessen damage
    dmg = Math.max(dmg, 1);               //always do at least 1 dmg

    // let dc = 2, dmg = 1;
    // if(numConns === 4) {
    //     dc += 3;
    // } else if(numConns === 3) {
    //     dc += 2; dmg += 1;
    // } else if(numConns === 2) {
    //     dc += 2; dmg += 2;
    // } else {
    //     dc += 1; dmg += 2;
    // }

    // let connOffset = Math.floor(numConns * 0.5);    //0, 1, 2
    // let dmg = 3 - connOffset;
    // let dc  = dmg + connOffset +
    //     (test(5000, 4000) ?  1 : 0) +   //slim chance of being harder
    //     (test(5000, 4500) ? -1 : 0);    //slim chance of being easier

    let name = NAMES[ Math.floor(Math.random()*NAMES.length) ];
    let slot = new Slot(dc);
    let reward : Reward = {
        type: RewardTypes.Damage,
        label: getLabel(dmg),       //`Deal ${dmg} Damage`,
        value: dmg
    }
    return new Part(name, slot, reward, connectors);
}
