import {
    Component, OnInit, Input, Output, EventEmitter
} from '@angular/core';

import { Slot } from './slot';
import { ClipboardService } from '../clipboard.service';
import { RewardsService, RewardTypes } from '../reward.service';

export interface SlotEvent {
    type: 'die.added' | 'die.ejected' | 'die.cooled';
}

@Component({
  selector: 'ateam-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.less']
})
export class SlotComponent implements OnInit {

    @Input()  slot : Slot;
    @Output() onEvent : EventEmitter<SlotEvent> = new EventEmitter<SlotEvent>();

    constructor(
        private clipboard : ClipboardService,
        private rewards : RewardsService
     ) { }

    ngOnInit() {
    }


    public addDie( value : number, override ?: boolean ) {
        this.slot.addDie(value, override);
        this.onEvent.emit({ type: 'die.added' });
    }

    public coolDie() {
        this.slot.coolDie();
        this.onEvent.emit({ type: 'die.cooled' });
    }

    public ejectDie() {
        this.slot.ejectDie();
        this.onEvent.emit({ type: 'die.ejected' });
    }

    incr() {
        if(!this.slot.hasDie()) return;
        this.slot.addDie(this.slot.die+1);
        this.onEvent.emit({ type: 'die.added' });
    }

    decr() {
        if(!this.slot.hasDie()) return;
        this.coolDie();
    }

    onSlotClick() {
        if(!this.slot.hasDie()) {

            let value = this.clipboard.peek();
            if(value < this.slot.dc) {
                if( !this.rewards.has(RewardTypes.Slot, this.slot.dc) ) return;
                //TODO prompt about using reward
                value = this.rewards.get(RewardTypes.Slot, this.slot.dc).value;
            }
            this.addDie(value);
            this.clipboard.paste();
        }
    }

    onDieClick($event) {
        if ($event.altKey) { //TODO check for reward before allowing this
            event.preventDefault();
			event.stopPropagation();

            if(this.rewards.has(RewardTypes.DieFace)) {
                this.rewards.get(RewardTypes.DieFace)
                let newValue = prompt("Enter new die value", this.slot.die +'');
                this.slot.die = parseInt(newValue);
                this.slot.checkDie();
            }
        }
    }
}
