
import { Die } from '../roll/roll';

export class Slot {

    private _die : Die = null;
    private _currVal : number = -1;

    constructor(private _dc : number) { }

    public hasDie() : boolean { return !!this._die; }
    public get die() : Die { return this._die; }
    public set die( val : Die ) { this._die = val; }
    public get dc() : number { return this._dc; }
    public get value() : number { return this._currVal; }
    public set value(v: number) { this._currVal = v; }

    public addDie( die : Die, override ?: boolean ) {
        let value = die.value;
        if(value && (override || value >= this.dc)) {
            //add die to slot with value
            this._die = die;
            this._currVal = die.value;
        }
    }

    public coolDie() {
        if(this._die && this._currVal > 0) {
            this._currVal--;
            this._die.value--;
            this.checkDie();
        }
    }

    public ejectDie() {
        this._die = null;
        this._currVal = -1; //remove die
    }

    public checkDie() {
        if(this._currVal < this._dc) {
            this.ejectDie();
        }
    }
}
