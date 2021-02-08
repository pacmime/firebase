
export class Slot {

    private _die : number = -1;

    constructor(private _dc : number) { }

    public hasDie() : boolean { return this._die > 0; }
    public get die() : number { return this._die; }
    public set die( val : number ) { this._die = val; }
    public get dc() : number { return this._dc; }

    public addDie( value : number, override ?: boolean ) {
        if(value && (override || value >= this.dc)) {
            //add die to slot with value
            this._die = value;
        }
    }

    public coolDie() {
        if(this._die > 0) {
            this._die--;
            this.checkDie();
        }
    }

    public ejectDie() {
        this._die = -1; //remove die
    }

    public checkDie() {
        if(this._die < this._dc) {
            this._die = -1;
        }
    }
}
