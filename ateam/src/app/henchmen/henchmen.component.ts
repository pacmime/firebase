import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Henchmen } from './henchmen';
import { RewardsService, RewardTypes } from '../reward.service';


@Component({
  selector: 'ateam-henchmen',
  templateUrl: './henchmen.component.html',
  styleUrls: ['./henchmen.component.less']
})
export class HenchmenComponent implements OnInit {

    @Input() henchmen : Henchmen;
    @Output() onEvent : EventEmitter<any> = new EventEmitter<any>();

    constructor( private rewards : RewardsService ) { }

    ngOnInit() {

        if(!this.henchmen) {
            let hp = Math.ceil((Math.random()*3000/1000));
            this.henchmen = new Henchmen(hp);
        }

    }

    canDamage() : boolean {
        return this.rewards.has( RewardTypes.Damage );
    }

    damage() {

        let reward = this.rewards.get( RewardTypes.Damage );
        if(!reward) return;

        this.henchmen.damage(1);
        if(this.henchmen.hp <= 0) {
            this.onDefeated();
        }
    }

    canDefeat() : boolean {
        return this.rewards.has( RewardTypes.Defeat );
    }

    defeat() {
        let reward = this.rewards.get( RewardTypes.Defeat );
        if(!reward) return;
        this.onDefeated();
    }

    onDefeated() {
        this.onEvent.emit(this.henchmen);
    }

}
