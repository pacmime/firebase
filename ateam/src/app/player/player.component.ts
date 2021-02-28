import {
    HostBinding, Component, OnInit, OnChanges,
    Input, Output, EventEmitter, SimpleChanges
} from '@angular/core';

import { Die, Roll } from '../roll/roll';
import { RollEvent } from '../roll/roll.component';
import { Team, Reward, RewardTypes, RewardTypeLabels, RewardTypeIcons } from '../models';
import { ClipboardService } from '../clipboard.service';
import { RewardsService } from '../reward.service';


export interface PlayerEvent {
    type  : 'damage' | 'defeat' | 'parts' | 'tracker' | 'action';
    value  : number;
    member : string;
}

// const MEMBERS = [ 'hannibal', 'faceman', 'ba', 'murdock' ];


@Component({
  selector: 'ateam-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent implements OnInit {

    @Input() member : string;
    @Input() round : number;
    @Output() onEvent : EventEmitter<PlayerEvent> = new EventEmitter<PlayerEvent>();

    public roll : Roll;
    public messages : string[] = [];
    public NoReward : any = RewardTypes.None;

    constructor(
        private clipboard : ClipboardService,
        private rewards : RewardsService
    ) { }

    ngOnInit() {
        this.rollDice();
    }

    ngOnChanges( changes : SimpleChanges ) {
        if(changes.round && this.roll) {

            //check any dice for 1s that haven't been spent and apply the penalties
            let numFails = this.roll.getFails();
            if(numFails > 0) {
                this.onEvent.emit({type:'tracker',value:numFails, member: this.member});
            }

            //roll a new set of dice for this player
            this.rollDice();
        }
    }

    @HostBinding('class') get class() {
        return this.member.toString().toLowerCase();
    }

    rollDice() {
        this.messages = [];                 //clear messages for roll
        this.roll = new Roll(this.member);  //create new roll (for change detection)
        this.roll.roll();                   //and roll dice
    }

    /** */
    onRollEvent($event : RollEvent) {

        if($event.reward) {
            let reward = $event.reward;
            if(reward.type === RewardTypes.Penalty) {
                this.onEvent.emit({type:'tracker',value:1, member: this.member});
            } else if(reward.type === RewardTypes.Tracker) {
                this.onEvent.emit({type:'tracker',value:-1, member: this.member});
            } else {
                this.rewards.add($event.reward);
            }
            return;
        }

        switch($event.type) {
            case 'tracker':
            case 'action':
            this.onEvent.emit({type:$event.type, value:$event.value||1, member:this.member});
            break;
        }
    }

}
