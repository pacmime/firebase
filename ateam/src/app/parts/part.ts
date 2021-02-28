
import { Slot } from '../slot/slot';
import { Reward, RewardTypes } from '../models';


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


const DAMAGE_LABEL = '<span class="fas fa-bahai"></span>';


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

    getRewardLabel() : string {
        let dmg = this.reward.value;
        let result = '<span title="Deal ' + dmg + ' Damage">';
        for(let i=0; i<dmg; ++i) result += DAMAGE_LABEL;
        result += '</span>';
        return result;
    }

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

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = random(currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/** */
export function PartFactory( numConns : number = 0 ) {

    if(!numConns) numConns = determineNumConnections();
    let connectors = distributeConnections(numConns);

    let dc = random(6), dmg = 1 + (dc-2); //higher DCs do more damage
    dmg -= Math.max(0, numConns-2);       //more connections lessen damage
    dmg = Math.max(dmg, 1);               //always do at least 1 dmg

    let name = NAMES[ Math.floor(Math.random()*NAMES.length) ];
    let slot = new Slot(dc);
    let reward = new Reward(RewardTypes.Damage, dmg);
    return new Part(name, slot, reward, connectors);
}

/** */
export function buildDeck(numParts : number) : Part[] {

    let result = [];
    let numFours  = Math.floor(numParts / 4);
    let numThrees = Math.floor((numParts-numFours) / 3);
    let numTwos   = Math.floor((numParts-numFours-numThrees) / 2);
    let numOnes   = numParts - numFours - numThrees - numTwos;
    console.log(`Deck distribution: ${numFours} / ${numThrees} / ${numTwos} / ${numOnes}`);

    //10 four-conn parts
    for(let i=0; i<numFours; i++) result.push(PartFactory(4));

    //10 three-conn parts
    for(let i=0; i<numThrees; i++) result.push(PartFactory(3));

    //10 two-conn parts
    for(let i=0; i<numTwos; i++) result.push(PartFactory(2));

    //10 one-conn parts
    for(let i=0; i<numOnes; i++) result.push(PartFactory(1));

    return shuffle(result);
}



// export const PartsDeck : Part[] = buildDeck(40);
