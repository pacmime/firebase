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

        this.applyModifiers();
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
        this.applyModifiers();
    }

    isModified () {
        return !!this.modifiers;
    }

    applyModifiers() {
        let modifier = this.modifiers ? this.modifiers.value*1 : 0;
        if(modifier) {
            this.computed = this.value*1 + modifier;
        } else {
            this.computed = this.value*1;
        }
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

    getKeypadOpts() : any {
        return {
            data: {
                visible: true,
                value : this.computed,
                modifiers : this.modifiers
            }
        };
    }

    openKeypad(): void {
        let opts = this.getKeypadOpts();
        const dialogRef = this.dialog.open(KeypadComponent, opts);
        this.subscription = dialogRef.afterClosed().subscribe( ( result : any ) => {
            this.onKeypadChange(result);
            this.subscription.unsubscribe();
            this.subscription = null;
        });
    }

    onKeypadChange( result : any ) {
        if( !isNaN(result) ) {
            let current = this.applyKeypadChange(result*1);
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
    }

    applyKeypadChange( change : number ) : number {
        let current = this.value*1;
        current += change - this.computed;
        return current;
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








@Component({
    selector: 'sidebag-value-display',
    styleUrls: ['./value-display.component.less'],
    template: `
    <div class="vd">
        <div class="vd__value" [ngClass]="{modified:isModified()}"
            (click)="openKeypad()">
            <div>
                <div class="m-grid flex-col flex-align-center no-pad">
                    {{weight}}
                    <div class="needed u-xs">{{value}}</div>
                </div>
            </div>
        </div>
        <button type="button" class="vd__incr" (click)="increment()"
            (ngDisabled)="!canAdjust || !canIncrement()">
            <mat-icon>add</mat-icon>
        </button>
        <button type="button" class="vd__decr" (click)="decrement()"
            (ngDisabled)="!canAdjust || !canDecrement()">
            <mat-icon>remove</mat-icon>
        </button>
        <div class="vd__label" [ngClass]="{'u-sm':'sm'===options.labelSize}">
            {{label}}
        </div>
    </div>
    `
})
export class SidebagValueDisplayComponent extends ValueDisplayComponent {
    @Input()  weight : number = 0;
    @Output() onLevel: EventEmitter<{xp:number}> = new EventEmitter<{xp:number}>();
}



@Component({
    selector: 'value-display-with-max',
    styleUrls: ['./value-display.component.less'],
    template: `
    <div class="vd">
        <div class="vd__value" [ngClass]="{modified:isModified()}"
            (click)="openKeypad()">
            <div>
                <div class="m-grid flex-col flex-align-center no-pad">
                    {{value}}
                    <div class="needed u-xs">{{computed}}</div>
                </div>
            </div>
        </div>
        <button type="button" class="vd__incr" (click)="increment()"
            (ngDisabled)="!canAdjust || !canIncrement()">
            <mat-icon>add</mat-icon>
        </button>
        <button type="button" class="vd__decr" (click)="decrement()"
            (ngDisabled)="!canAdjust || !canDecrement()">
            <mat-icon>remove</mat-icon>
        </button>
        <div class="vd__label" [ngClass]="{'u-sm':'sm'===options.labelSize}">
            {{label}}
        </div>
    </div>
    `
})
export class ValueDisplayWithMaxComponent extends ValueDisplayComponent {
    @Input()  max : number = 0;

    /** @override */
    applyModifiers() {
        let modifier = this.modifiers ? this.modifiers.value*1 : 0;
        if(modifier) {
            this.computed = this.max*1 + modifier;
        } else {
            this.computed = this.max*1;
        }
    }

    /** @override */
    getKeypadOpts() : any {
        return {
            data: {
                visible: true,
                value : this.value
            }
        };
    }

    /** @override */
    applyKeypadChange( change : number ) : number {
        let current = this.value*1;
        current += change - this.value;
        return current;
    }
}
