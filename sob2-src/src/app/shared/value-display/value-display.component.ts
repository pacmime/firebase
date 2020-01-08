import {
    Component, OnInit, OnChanges, OnDestroy, Input, Output,
    EventEmitter, SimpleChanges, ElementRef
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { KeypadComponent } from '../keypad/keypad.component';


@Component({
    selector: 'value-display',
    templateUrl: './value-display.component.html',
    styleUrls: ['./value-display.component.less']
})
export class ValueDisplayComponent implements OnInit, OnDestroy {

    @Input() value: number = 0;
    @Input() modifiers: { value:number, sources: string[] };
    @Input() label: string;
    @Input() canAdjust: boolean = true;
    @Input() min: number = 0;
    @Input() max: number;
    @Input() step: number = 1;
    @Input() special: boolean = false;
    @Output() onSave: EventEmitter<{label:string,value:number}> = new EventEmitter<{label:string,value:number}>();

    public computed: number = 0;
    public  dialog    : MatDialog;
    private subscription : Subscription;

    @Input() options: {
        valueSize? : string;
        labelSize? : string;
        min? : number;
        max? : number;
    } = { min: 0 };

    constructor( dialog ?: MatDialog ) {
        if(dialog) this.dialog = dialog;
    }

    ngOnInit() {
        if(typeof(this.canAdjust) === 'undefined')
        this.canAdjust = true;

        let modifier = this.modifiers ? this.modifiers.value*1 : 0;
        this.computed = this.value*1 + modifier;
        // console.log(this.label + ": " + this.value + " + " + modifier + " = " + this.computed + " (" + this.isModified() + ")");
    }

    ngOnChanges (changes : SimpleChanges) {
        // console.log("VD.ngOnChanges (" + this.label + "): " + JSON.stringify(changes.value) + " / " + changes.modifiers);

        if(changes.value && !changes.value.firstChange) {
            this.onValueChange(changes.value.currentValue);
        } else if(changes.modifiers) {
            this.onValueChange(this.value);
        }
    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    onValueChange(newValue) {
        // console.log("VD.onValueChange() - new '" + newValue + "' vs current '" + this.value + "'");
        if(this.value !== newValue*1)
            this.value = newValue*1;
        this.options.valueSize = (this.value > 999) ? 'sm' : null;
        let modifier = this.modifiers ? this.modifiers.value*1 : 0;
        if(modifier) {
            // console.log("Value Display using modifier (" + modifier + ") for " + this.label);
            this.computed = this.value*1 + modifier;
        } else {
            this.computed = this.value*1;
        }
    }

    isModified () {
        return !!this.modifiers;
    }

    increment() {
        if(!this.canIncrement()) return;
        this.onValueChange(this.value*1 + this.step*1);
        this.onSave.emit({label:this.label,value:this.value});
    }

    decrement() {
        if(!this.canDecrement()) return;
        this.onValueChange(this.value*1 - this.step*1);
        this.onSave.emit({label:this.label,value:this.value});
    }

    canIncrement() {
        return  !this.options ||
                typeof(this.options.max) === 'undefined' ||
                this.value*1 < this.options.max*1;
    }

    canDecrement() {
        return  !this.options ||
                typeof(this.options.min) === 'undefined' ||
                this.value * 1 > this.options.min * 1;
    }

    openKeypad(): void {
        let opts = {
            data: {
                visible: true,
                value : this.computed,
                modifiers : this.modifiers
            }
        };
        const dialogRef = this.dialog.open(KeypadComponent, opts);
        this.subscription = dialogRef.afterClosed().subscribe( ( result : any ) => {
            if( !isNaN(result) ) {
                let change = result*1;
                let current = this.value*1;
                current += change - this.computed;
                try {
                    this.onValueChange(current);
                } catch(e) {
                    console.log("VD keypad - Error changing value: " + e.message);
                }
                try {
                    this.onSave.emit({label:this.label,value:this.value});
                } catch(e) {
                    console.log("VD keypad - Error emitting save event " + e.message);
                }
            }
            this.subscription.unsubscribe();
            this.subscription = null;
        });
    }

}








@Component({
    selector: 'xp-value-display',
    templateUrl: './xp-value-display.component.html',
    styleUrls: ['./value-display.component.less']
})
export class XPValueDisplayComponent extends ValueDisplayComponent {

    @Input() needed : number = 9999;
    @Output() onLevel: EventEmitter<{xp:number}> = new EventEmitter<{xp:number}>();

    hasLeveled() : boolean {
        return this.value >= this.needed;
    }

}
