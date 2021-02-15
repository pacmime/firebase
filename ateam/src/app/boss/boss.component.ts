import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { RewardsService, RewardTypes } from '../reward.service';
import { Modes, Difficulties } from '../models';

const HP = {};
HP[Difficulties.Normal] = 20;
HP[Difficulties.Hard] = 25;
HP[Difficulties.Elite] = 30;


@Component({
  selector: 'ateam-boss',
  templateUrl: './boss.component.html',
  styleUrls: ['./boss.component.less']
})
export class BossComponent implements OnInit, OnChanges {

    @Input() mode : any;
    @Input() difficulty : number = Difficulties.Normal;
    public hp : number = 10;
    public max: number = 10;
    public inShowdown : boolean = false;

    constructor( private rewards : RewardsService ) { }

    ngOnInit() {
        this.hp = HP[this.difficulty]*1;
        this.max = HP[this.difficulty]*1;
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
