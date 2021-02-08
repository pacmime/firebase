import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { RewardsService, RewardTypes } from '../reward.service';
import { Modes } from '../models';


@Component({
  selector: 'ateam-boss',
  templateUrl: './boss.component.html',
  styleUrls: ['./boss.component.less']
})
export class BossComponent implements OnInit, OnChanges {

    @Input() mode : any;
    public hp : number = 10;
    public max: number = 10;
    public inShowdown : boolean = false;

    constructor( private rewards : RewardsService ) { }

    ngOnInit() {
    }

    ngOnChanges( changes : SimpleChanges ) {
        if(changes.mode) {
            let mode = changes.mode.currentValue;
            // console.log("New Mode: " + mode);
            this.inShowdown = (Modes.Showdown === mode);
        }
    }

    damage() {

        let reward = this.rewards.get( RewardTypes.Damage );
        if(!reward) return;

        this.hp -= reward.value || 1;
        if(this.hp <= 0) {

            alert("You win!");
        }
    }

    canDamage() {
        return this.rewards.has( RewardTypes.Damage );
    }
}
