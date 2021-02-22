import {
    HostBinding, Component, OnInit, OnChanges,
    Input, Output, EventEmitter, SimpleChanges
} from '@angular/core';

import { Die, Roll } from '../roll';
import { Team, Reward, RewardTypes, RewardTypeLabels, RewardTypeIcons } from '../models';
import { ClipboardService } from '../clipboard.service';
import { RewardsService } from '../reward.service';


export interface PlayerEvent {
    type: 'damage' | 'defeat' | 'parts' | 'tracker' | 'action';
    value: number;
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
    public hasPair : boolean = false;
    public hasTriple : boolean = false;
    public hasQuad : boolean = false;
    public hasSpecial : boolean = false;
    public hasFail : boolean = false;
    public numRewardsAvailable : number = 0;
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
            this.rollDice();
        }
    }

    @HostBinding('class') get class() {
        return this.member.toString().toLowerCase();
    }

    rollDice() {
        this.messages = [];
        this.roll = new Roll(this.member);
        this.roll.roll();
        this.checkRoll();
    }

    /** */
    onDieClick( die : any, $event: any) {
        if ($event.altKey) {
            event.preventDefault();
            event.stopPropagation();

            //make sure a reward exists
            if(!this.rewards.has(RewardTypes.DieFace)) return;
            this.rewards.get(RewardTypes.DieFace);
            let val = prompt("Enter new die value", die.value);
            let newValue : number = parseInt(val);
            die.value = isNaN(newValue) ? die.value : newValue;
            this.roll.check();
            return;
        }
        if ($event.shiftKey) {
            event.preventDefault();
			event.stopPropagation();
            die.used = !die.used;    //mark as used
            return;
        }
        if(die.used) return;    //if already used, ignore click
        die.selected = true;    //mark as being copied
        this.clipboard.copy(die.value, (used : boolean) => {
            die.selected = false;   //unmark
            die.used = used;        //and set as used
            this.roll.check();
            this.checkAllUsed();
        });
    }


    checkRoll() {
        this.roll.check();
        if(this.roll.groupUsed) return;

        //if player's roll has multiples, they get additional actions they
        // can choose rewards from
        if(this.roll.hasQuad) {
            this.messages.push("Four of Kind: +2 Actions!")
            this.onEvent.emit({type: 'action', value: 2, member: this.member});
        } else if(this.roll.hasTriple) {
            this.messages.push("Three of Kind: +1 Actions!")
            this.onEvent.emit({type: 'action', value: 1, member: this.member});
        } else if(this.roll.hasPair) {
            this.messages.push("Two of Kind: +1 Damage!")
            this.rewards.add(new Reward(RewardTypes.Damage));
            // this.onEvent.emit({type: 'action', value: 1, member: this.member});
        }

    }

    addReward(reward : Reward) {
        this.rewards.add(reward);
    }

    /**
     *
     */
    useDie( die : Die ) {
        if(die.used) return;   //already spent
        die.used = true;
        if(die.reward.type === RewardTypes.Penalty) {
            // this.rewards.add(die.reward);
            this.onEvent.emit({type:'tracker',value:1, member: this.member});
        } else if(die.reward.type === RewardTypes.Tracker) {
            this.onEvent.emit({type:'tracker',value:-1, member: this.member});
        } else {
            this.rewards.add(die.reward);
        }

        this.checkAllUsed();
    }

    checkAllUsed() {
        if(this.roll.allUsed()) {
            console.log(`${this.member} has used all dice!`);
            let reward = new Reward(RewardTypes.Damage);
            this.rewards.add(reward);
        }
    }

}
