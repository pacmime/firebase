import {
    HostBinding, Component, OnInit, OnChanges,
    Input, Output, EventEmitter, SimpleChanges
} from '@angular/core';

import { Roll } from '../roll';
import { ClipboardService } from '../clipboard.service';
import { Reward, RewardsService } from '../reward.service';


export interface PlayerEvent {
    type: 'damage' | 'defeat' | 'parts' | 'tracker' | 'action';
    value: number;
}

const MEMBERS = [ 'hannibal', 'faceman', 'ba', 'murdock' ];


@Component({
  selector: 'ateam-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent implements OnInit {

    @Input() round : number;
    @Input() member : any;
    @Output() onEvent : EventEmitter<PlayerEvent> = new EventEmitter<PlayerEvent>();

    public roll : Roll = new Roll();
    public hasPair : boolean = false;
    public hasTriple : boolean = false;
    public hasQuad : boolean = false;
    public hasSpecial : boolean = false;
    public hasFail : boolean = false;
    public numRewardsAvailable : number = 0;

    constructor(
        private clipboard : ClipboardService,
        private rewards : RewardsService
    ) { }

    ngOnInit() {
    }

    ngOnChanges( changes : SimpleChanges ) {
        if(changes.round) {
            this.rollDice();
        }
    }

    @HostBinding('class') get class() {
        return this.member.name.toLowerCase();
    }

    rollDice() {
        this.roll = new Roll();
        this.roll.roll();
        this.checkRoll();
    }

    /** */
    onDieClick( die : any, $event: any) {
        if ($event.altKey) {
            //
            //TODO check for reward before allowing this
            //
            //
            event.preventDefault();
			event.stopPropagation();
            let val = prompt("Enter new die value", die.value);
            let newValue : number = parseInt(val);
            die.value = isNaN(newValue) ? die.value : newValue;
            this.checkRoll();
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

            //TODO if die was a 1, check if fail should still be active
            this.checkRoll();
        });
    }


    checkRoll() {
        let name = this.member.name.toLowerCase();
        let idx = MEMBERS.indexOf(name);
        // if(idx >= 0 && 6 === this.roll.results[idx].value) {
        //     this.addReward(this.member.special.reward);
        // }

        this.hasFail = this.roll.hasFail();
        this.hasPair = this.roll.hasPair();
        this.hasTriple = this.roll.hasTriple();
        this.hasQuad = this.roll.hasQuad();
        this.hasSpecial = this.roll.hasSpecial(idx);

    }

    addReward(reward : Reward) {
        this.rewards.add(reward);
    }

    spend(type : number) {
        switch(type) {

            //Fail
            case 1:
            this.roll.markFail();
            this.onEvent.emit({type:'tracker',value:1});
            break;

            //Pair
            case 2:
            this.roll.getPair();
            this.numRewardsAvailable += 1;
            this.onEvent.emit({type: 'action', value: 1});
            break;

            // 3 of a Kind
            case 3: this.roll.getThreeOfAKind();
            this.numRewardsAvailable += 2;
            this.onEvent.emit({type: 'action', value: 2});
            break;

            // 4 of a Kind
            case 4: this.roll.getFourOfAKind();
            this.numRewardsAvailable += 3;
            this.onEvent.emit({type: 'action', value: 3});
            break;

            // Special
            case 6:
            this.addReward(this.member.special.reward);
            let name = this.member.name.toLowerCase();
            let idx = MEMBERS.indexOf(name);
            this.roll.useSpecial(idx);
        }
        this.checkRoll();
    }

}
