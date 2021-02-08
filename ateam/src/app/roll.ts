
export interface Die {
    value     : number;
    used     ?: boolean;
    selected ?: boolean;
}

export class Roll {

    //H=0, F=1, BA=2, M=3
    private _results : Die[] = [];

    public get results() : Die[] { return this._results; }


    constructor() {

    }

    public hasPair() : boolean { return this.hasCount(2); }
    public hasTriple() : boolean {  return this.hasCount(3); }
    public hasQuad() : boolean {  return this.hasCount(4); }
    // public getStraight() : number[] { return this._straight; }
    public hasSpecial( index : number ) : boolean {
        return this._results[index].value === 6 &&
            !this._results[index].used;
    }
    public hasFail() : boolean {
        return !!this._results.find(d=>d.value===1 && !d.used);
    }


    public getPair() : number { return this.useGroup(2); }
    public getThreeOfAKind() : number { return this.useGroup(3); }
    public getFourOfAKind() : number { return this.useGroup(4); }
    public markFail() {
        let d = this._results.find(d=>d.value===1 && !d.used);
        if(d) d.used = true;
    }
    public useSpecial(index : number) {
        this._results[index].used = true;
    }


    public roll() {
        for(let i=0; i<4; ++i) {
            let val = Math.ceil(Math.random()*6);
            this._results[i] = { value: val };
        }
    }

    private hasCount( min : number ) : boolean {
        for(let i=1; i<=6; ++i) {
            let count = this._results.filter(r=> r.value === i && !r.used).length;
            if(count >= min) return true;
        }
        return false;
    }

    private useGroup( min : number ) : number {
        for(let i=1; i<=6; ++i) {
            let dice = this._results.filter(r=> r.value === i && !r.used);
            let count = dice.length;
            if(count >= min) {
                dice.forEach((d,i)=>d.used=i<min)
                return i;
            }
        }
        return -1;
    }

}
