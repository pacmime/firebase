
import { Injectable } from "@angular/core";

import { Die } from './roll/roll';

@Injectable()
export class ClipboardService {

    private _die : Die;
    private _callback : any;

    constructor() {}

    copy( die : Die, callback : (used : boolean) => void ) : void {
        if(this._callback) this._callback(false);
        this._die = die;
        this._callback = callback;
    }

    paste() : Die {
        if(this._callback) this._callback(true);
        setTimeout(() => { this.clear() });
        return this._die;
    }

    peek() : Die { return this._die; }

    clear() {
        this._callback = null;
        this._die = null;
    }

}
