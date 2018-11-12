import {
    Component, OnInit, OnChanges, Input, Output,
    EventEmitter, SimpleChanges, ElementRef
} from '@angular/core';

import { ModalService } from'../../modal.service'
import { KeypadComponent } from '../keypad/keypad.component';

@Component({
    selector: 'value-display',
    templateUrl: './value-display.component.html',
    styleUrls: ['./value-display.component.less']
})
export class ValueDisplayComponent implements OnInit {

    @Input() value: number = 0;
    @Input() modifiers: { value:number, sources: string[] };
    @Input() label: string;
    @Input() canAdjust: boolean = true;
    @Input() min: number = 0;
    @Input() max: number;
    @Input() step: number = 1;
    @Output() onSave: EventEmitter<{label:string,value:number}> = new EventEmitter<{label:string,value:number}>();

    public computed: number = 0;

    @Input() options: {
        valueSize? : string;
        labelSize? : string;
        min? : number;
        max? : number;
    } = { min: 0 };

    constructor(private modalService : ModalService) { }

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

    openKeypad() {
        // let closeFn = this.modalService.open(ModalComponent);

        const kpRef = this.modalService.createComponentRef(KeypadComponent);
        let instance = kpRef.instance;
        instance.visible = true;
        instance.value = this.computed;
        instance.modifiers = this.modifiers;
        instance.onClose = (event) => {
            this.modalService.destroyRef(kpRef, 0);

            if(event.apply) {
                let change = event.value*1;
                let current = this.value*1;
                current += change - this.computed;
                this.onValueChange(current);
                this.onSave.emit({label:this.label,value:this.value});
            }
        };

        const kpElement = this.modalService.getDomElementFromComponentRef(kpRef);
        this.modalService.addChild(kpElement);
    }

}








@Component({
    selector: 'xp-value-display',
    templateUrl: './xp-value-display.component.html',
    styleUrls: ['./xp-value-display.component.less']
})
export class XPValueDisplayComponent extends ValueDisplayComponent {

    @Input() needed : number = 9999;
    @Output() onLevel: EventEmitter<{xp:number}> = new EventEmitter<{xp:number}>();


    hasLeveled() : boolean {
        return this.value >= this.needed;
    }

    onValueChange(newValue) {
        super.onValueChange(newValue);

        if(this.onLevel) {
            let xp = this.value*1;
            if(xp >= this.needed) {
                this.onLevel.emit({xp:xp});
            }
        }
    }

}
