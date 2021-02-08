
export class Henchmen {

    private _name: string = "Henchmen";
    private _hp : number = 0;
    private _max : number = 0;

    constructor( max : number ) {
        this._max = max;
        this._hp = max;
    }

    public get name() : string { return this._name; }
    public get hp() : number { return this._hp; }
    public get max() : number { return this._max; }

    public damage( dmg : number ) {
        this._hp -= dmg;
    }
}
