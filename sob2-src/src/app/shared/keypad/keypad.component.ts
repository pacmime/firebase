
import {
  Component, OnInit, OnDestroy, Input, Output, OnChanges, EventEmitter
} from '@angular/core';
import {
    trigger, state, style, animate, transition
} from '@angular/animations';

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
export class KeypadComponent implements OnInit {

    @Input() closable = true;
    @Input() visible: boolean;
    @Input() value : number;
    @Input() minimum : number = 0;
    @Input() maximum : number = 9999;
    @Input() modifiers : { value: number; sources: string[]; };
    @Output() onClose: Function;

    private manualAdj : number;
    private changes : number[] = [] as number[];
    private result : number = 0;

    constructor() { }

    ngOnInit() {
        this.result = this.value;
    }

    ngOnDestroy() {
        this.closable = false;
        this.visible = false;
        this.value = 0;
        this.minimum = 0;
        this.maximum = 0;
        this.modifiers = null;
        this.onClose = null;
        this.manualAdj = null;
        this.changes = null;
        this.result = 0;
    }

    close() {
        this.visible = false;
        try {
            this.onClose({apply:false,value:this.result});
        } catch (e) {
            console.log("Keypad: Error caught firing close event to callee");
            console.log(e);
        }
    }

    apply() {
        this.visible = false;
        try {
            this.onClose({apply:true,value:this.result});
        } catch (e) {
            console.log("Keypad: Error caught firing apply event to callee");
            console.log(e);
        }
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
