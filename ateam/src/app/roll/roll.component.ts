import {
    HostBinding, Component, OnInit, OnChanges,
    Input, Output, EventEmitter, SimpleChanges
} from '@angular/core';

import { Die, Roll } from './roll';
import { Team, Reward, RewardTypes, RewardTypeLabels, RewardTypeIcons } from '../models';
import { ClipboardService } from '../clipboard.service';
import { RewardsService } from '../reward.service';


export interface RollEvent {
    reward ?: Reward;
    type   ?: string;
    value  ?: number;
}

@Component({
  selector: 'die-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.less']
})
export class RollComponent implements OnInit {

    @Input() roll : Roll;
    @Output() onEvent : EventEmitter<RollEvent> = new EventEmitter<RollEvent>();

    public NoReward : any = RewardTypes.None;

    constructor(
        private clipboard : ClipboardService,
        private rewards : RewardsService
    ) { }

    ngOnInit() { }

    ngOnChanges( changes : SimpleChanges ) {
        if(changes.roll) {
            let roll = changes.roll.currentValue;
            this.checkRoll(roll);
        }
    }

    /** */
    onDieClick( die : any, $event: any) {

        if(die.used) return;    //if already used, ignore click

        if ($event.altKey) {    //Player is changing the die's face value
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

        if ($event.shiftKey) {  //Player is marking die as used (not used anymore)
            event.preventDefault();
			event.stopPropagation();
            die.used = !die.used;    //mark as used
            return;
        }

        //die was already selected, deselect it
        if(die.selected) {
            die.selected = false;
            this.clipboard.clear();
            return;
        }

        die.selected = true;    //mark as being copied
        this.clipboard.copy(die, (used : boolean) => {
            die.selected = false;   //unmark
            die.used = used;        //and set as used
            if(used) {
                this.roll.check();
                this.checkAllUsed();
            }
        });
    }

    /**
     * if a roll has multiples, the players get additional actions they
     * can choose rewards from
     */
    checkRoll(roll : Roll) {
        roll.check();
        if(roll.groupUsed) return;

        if(roll.hasQuad) {
            console.log("4 of a Kind!");
            this.onEvent.emit({type: 'action', value: 2});
        } else if(roll.hasTriple) {
            console.log("3 of a Kind!");
            this.onEvent.emit({type: 'action', value: 1});
        } else if(roll.hasPair) {
            console.log("2 of a Kind!");
            this.onEvent.emit({reward: new Reward(RewardTypes.Damage)});
        }

    }

    /**
     *
     */
    useDie( die : Die ) {
        if(die.used) return;   //already spent
        die.used = true;
        this.onEvent.emit({ reward: die.reward });
        // if(die.reward.type === RewardTypes.Penalty) {
        //     // this.rewards.add(die.reward);
        //     this.onEvent.emit({type:'tracker',value:1, member: this.member});
        // } else if(die.reward.type === RewardTypes.Tracker) {
        //     this.onEvent.emit({type:'tracker',value:-1, member: this.member});
        // } else {
        //     this.rewards.add(die.reward);
        // }
        this.checkAllUsed();
    }

    checkAllUsed() {
        if(this.roll.allUsed()) {
            this.onEvent.emit({ reward: new Reward(RewardTypes.Damage) });
        }
    }

}
