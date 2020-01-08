
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
    trigger, state, style, animate, transition
} from '@angular/animations';

import { AbstractDialogComponent } from '../dialog/dialog.component';


@Component({
    selector: 'keypad',
    templateUrl: './keypad.component.html',
    styleUrls: ['./keypad.component.less'],
    animations: [
        trigger('dialog', [
          transition('void => *', [
            style({ transform: 'scale3d(.3, .3, .3)' }),
            animate(100)
          ]),
          transition('* => void', [
            animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
          ])
        ])
    ]
})
export class KeypadComponent extends AbstractDialogComponent<KeypadComponent>
implements OnInit, OnDestroy {

    private manualAdj : number;
    private changes   : number[] = [] as number[];
    private result    : number = 0;
    private minimum   : number = 0;
    private maximum   : number = 9999;

    constructor(
        dialogRef: MatDialogRef<KeypadComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        super(dialogRef, data);
    }

    ngOnInit() {
        super.ngOnInit();
        this.result = (!this.data || isNaN(this.data.value)) ? 0 : this.data.value;
        if(this.data && !isNaN(this.data.minimum)) this.minimum = this.data.minimum*1;
        if(this.data && !isNaN(this.data.maximum)) this.maximum = this.data.maximum*1;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.manualAdj = null;
        this.changes = null;
        this.result = 0;
    }

    change (v) {
        if(v>0) this.result = Math.min(this.result + v, this.maximum);
        else this.result = Math.max(this.result + v, this.minimum);
        this.changes.push(v);
    }

    changeManual (direction) {
        if(isNaN(this.manualAdj)) return; //if no value provided
        this.change(direction * this.manualAdj);
    }

    hasManual () {
        return  !isNaN(this.manualAdj);
    }

}
