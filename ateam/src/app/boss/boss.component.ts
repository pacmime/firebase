import {
    Component, Input, Output,
    OnInit, OnChanges, OnDestroy,
    SimpleChanges, EventEmitter
} from '@angular/core';
import { Subscription } from "rxjs";
import { RewardsService } from '../reward.service';
import { Modes, Difficulties, RewardTypes } from '../models';

const HP = {};
HP[Difficulties.Normal] = 20;
HP[Difficulties.Hard] = 25;
HP[Difficulties.Elite] = 30;


@Component({
  selector: 'ateam-boss',
  templateUrl: './boss.component.html',
  styleUrls: ['./boss.component.less']
})
export class BossComponent implements OnInit, OnChanges, OnDestroy {

    @Input() mode : any;
    @Input() difficulty : number = Difficulties.Normal;
    @Output() onEvent : EventEmitter<boolean> = new EventEmitter<boolean>();
    public hp : number = 10;
    public max: number = 10;
    public inShowdown : boolean = false;

    private rewardSub : Subscription;


    constructor( private rewards : RewardsService ) {

        this.rewardSub = this.rewards.subscribe(() => {
            if(!this.inShowdown) return;
            setTimeout( () => {
                let notDead : boolean = true;
                while( notDead && this.canDamage() ) {
                    notDead = !this.damage();
                }
            });
        });
    }

    ngOnInit() {
        this.hp = HP[this.difficulty]*1;
        this.max = HP[this.difficulty]*1;
    }

    ngOnChanges( changes : SimpleChanges ) {
        if(changes.mode) {
            let mode = changes.mode.currentValue;
            this.inShowdown = (Modes.Showdown === mode);
        }
    }

    ngOnDestroy() {
        this.rewardSub.unsubscribe();
        this.rewardSub = null;
    }

    damage() : boolean {

        let reward = this.rewards.get( RewardTypes.Damage );
        if(!reward) return;

        this.hp -= reward.value || 1;
        if(this.hp <= 0) {
            this.onEvent.emit(true);
            return true;
        }
        return false;
    }

    canDamage() : boolean {
        return this.rewards.has( RewardTypes.Damage );
    }
}
