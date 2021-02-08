
import { Injectable } from "@angular/core";

@Injectable()
export class ClipboardService {

    private _value: number;
    private _callback : any;

    constructor() {

    }

    copy( value : number, callback : (used : boolean) => void ) : void {

        if(this._callback) {
            this._callback(false);
        }

        this._value = value;
        this._callback = callback;
    }

    paste() : number {
        if(this._callback)
            this._callback(true);
        setTimeout(() => {
            this._callback = null;
            this._value = -1;
        });
        return this._value;
    }

    peek() : number { return this._value; }

}
