import {
    Component, OnInit, Input, Output, EventEmitter
} from '@angular/core';

import { Slot } from './slot';
import { Die } from '../roll/roll';
import { Team, RewardTypes } from '../models';
import { ClipboardService } from '../clipboard.service';
import { RewardsService } from '../reward.service';

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
    @Input() canSelectDie: boolean = false;
    @Output() onEvent : EventEmitter<SlotEvent> = new EventEmitter<SlotEvent>();

    constructor(
        private clipboard : ClipboardService,
        private rewards : RewardsService
     ) { }

    ngOnInit() {
    }


    public addDie( die : Die, override ?: boolean ) {
        this.slot.addDie(die, override);
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

    // incr() {
    //     if(!this.slot.hasDie()) return;
    //     this.slot.addDie(this.slot.die+1);
    //     this.onEvent.emit({ type: 'die.added' });
    // }
    //
    // decr() {
    //     if(!this.slot.hasDie()) return;
    //     this.coolDie();
    // }

    onSlotClick() {
        if(!this.slot.hasDie()) {

            let die = this.clipboard.peek();
            if(die) {
                let value = die.value;
                if(value >= this.slot.dc) {
                    this.addDie(die);
                    this.clipboard.paste();
                    return;
                }
            }

            if( this.rewards.has(RewardTypes.Die, this.slot.dc) ) {
                //TODO prompt about using reward
                let value = this.rewards.get(RewardTypes.Die, this.slot.dc).value;
                die = new Die(Team.Hannibal, Team.Hannibal, value);
                this.addDie(die);
                return;
            }

        } else if(this.canSelectDie){
            this.clipboard.copy(this.slot.die, (used : boolean) => {
                this.slot.ejectDie();
            });
        }
    }

    /** */
    onDieClick($event) {
        if ($event.altKey) { //TODO check for reward before allowing this
            event.preventDefault();
			event.stopPropagation();

            if(this.rewards.has(RewardTypes.DieFace)) {
                this.rewards.get(RewardTypes.DieFace)
                let newValue = prompt("Enter new die value", this.slot.die +'');
                this.slot.value = this.slot.die.value = parseInt(newValue);
                this.slot.checkDie();
            }
            return;
        }

        //if this slot allows selecting die inside it (aka, stored die in van)
        if(this.canSelectDie) {
            //die was already selected, deselect it
            if(this.slot.die.selected) {
                this.slot.die.selected = false;
                return;
            }
            //mark as selected and copy to clipboard
            this.slot.die.selected = true;
            this.clipboard.copy(this.slot.die, (used : boolean) => {
                //die being used
                if(used) this.slot.ejectDie();
                //another die selected, deselect this one
                else this.slot.die.selected = false;
            });
        }
    }
}
