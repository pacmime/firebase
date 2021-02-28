import {
    HostBinding, Component, OnInit, OnChanges,
    Input, Output, EventEmitter, SimpleChanges
} from '@angular/core';

import { Die } from '../roll/roll';
import { RollEvent } from '../roll/roll.component';
import { Slot } from '../slot/slot';
import { SlotEvent } from '../slot/slot.component';
import { Reward, RewardTypes, RewardTypeLabels, RewardTypeIcons } from '../models';
import { ClipboardService } from '../clipboard.service';
import { RewardsService } from '../reward.service';


export interface VanEvent {
    type   : 'damage' | 'defeat' | 'parts' | 'tracker' | 'action';
    value  : number;
    member?: string;
}

@Component({
  selector: 'ateam-van',
  templateUrl: './van.component.html',
  styleUrls: ['./van.component.less']
})
export class VanComponent implements OnInit {

    @Output() onEvent : EventEmitter<VanEvent> = new EventEmitter<VanEvent>();

    public hasPair : boolean = false;
    public hasTriple : boolean = false;
    public hasQuad : boolean = false;
    public numRewardsAvailable : number = 0;

    public slots : Slot[] = [];

    constructor(
        private clipboard : ClipboardService,
        private rewards : RewardsService
    ) { }

    ngOnInit() {
        this.slots = [
            new Slot(1),
            new Slot(1),
            new Slot(1),
            new Slot(1),
            new Slot(1)
        ];
    }

    ngOnChanges( changes : SimpleChanges ) {

    }

    onSlotEvent(event : SlotEvent ) {
        if(event.type === 'die.added') {
            // this.onEvent.emit(this.part);
        }
    }

    /** */
    onRollEvent($event : RollEvent) {

        if($event.reward) {
            let reward = $event.reward;
            if(reward.type === RewardTypes.Penalty) {
                this.onEvent.emit({type:'tracker',value:1});
            } else if(reward.type === RewardTypes.Tracker) {
                this.onEvent.emit({type:'tracker',value:-1});
            } else {
                this.rewards.add($event.reward);
            }
            return;
        }

        switch($event.type) {
            case 'tracker':
            case 'action':
            this.onEvent.emit({type:$event.type, value:$event.value||1});
            break;

        }
    }

}
