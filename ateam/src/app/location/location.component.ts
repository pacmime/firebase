import {
    Component, OnInit, OnChanges,
    Input, Output, EventEmitter, SimpleChanges
} from '@angular/core';

import { Slot } from '../slot/slot';
import { SlotEvent } from '../slot/slot.component';
import { Location, LocationFactory } from './location';
import { Henchmen } from '../henchmen/henchmen';
import { RewardsService, RewardTypes } from '../reward.service';

@Component({
  selector: 'ateam-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.less']
})
export class LocationComponent implements OnInit, OnChanges {

    @Output() onEvent : EventEmitter<any> = new EventEmitter<any>();
    @Input() location : Location = LocationFactory();
    @Input() round : number = 1;

    public name : string = "A location";

    constructor( private rewards : RewardsService ) { }

    ngOnInit() {
    }

    ngOnChanges( changes : SimpleChanges ) {
        if(changes.round && !this.location.complete) {
            this.location.refillHenchmen();
        }
    }

    onHenchmenEvent(henchmen : Henchmen) {
        this.location.removeHenchmen(henchmen);
    }

    onSlotEvent($event : SlotEvent) {
        // console.log("Location.onSlotEvent(" + $event.type + ")");
        switch($event.type) {
            case 'die.added':
            let slots = this.location.slots.filter(slot=>!slot.hasDie());
            if(!slots.length) this.completeLocation();
            break;

            case 'die.cooled': break;
            case 'die.ejected': break;
        }
    }

    completeLocation() {
        this.location.complete = true;
        this.rewards.add(this.location.reward);
        this.onEvent.emit(this.location);
    }
}
