import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Henchmen } from './henchmen/henchmen';
import { ATEAM } from "./player/team";
import { PlayerEvent } from './player/player.component';
import { Location, LocationFactory } from './location/location';
import { Contraption } from './contraption/contraption';
import { Part, PartFactory } from './parts/part';
import { Slot } from './slot/slot';
import { Reward, RewardTypes, RewardsService } from './reward.service';
import { Modes } from './models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    public team : any[] = [];
    public locations : Location[] = [];
    public contraption : Contraption = new Contraption();
    public round: number = 0;
    public tracker : number = 0;
    public RewardTypes = RewardTypes;
    public mode : any = Modes.Plan;
    public Modes = Modes;
    public showHelp : boolean = false;
    public previewPart : Part;
    public placeholderPart : Part = new Part(
        "Part", new Slot(1),
        { type: RewardTypes.Damage, label: "Reward" },
        { top: true, bottom: true, left: true, right: true }
    );
    public bankedActions : number = 0;
    public rewards : Reward[] = [];
    private rewardSub : Subscription;

    constructor( public rewardSvc : RewardsService ) {

    }

    ngOnInit() {

        this.rewardSub = this.rewardSvc.subscribe(() => {
            setTimeout( () => {
                this.rewards = this.rewardSvc.list();
            });
        });

        Object.keys(ATEAM).forEach( name => {
            let member = Object.assign({ name: name }, ATEAM[name]);
            this.team.push(member);
        });

        for(let i=0; i<4; ++i) {
            this.locations.push( LocationFactory() );
        }

        this.nextRound();
    }

    nextRound() {

        this.rewardSvc.clear();

        if( !this.locations.find( loc => !loc.complete ) ) {
            //if all locations have been closed, move to showdown
            this.mode = Modes.Showdown;
        } else {
            this.tracker++; //bump tracker if any locations still open
        }
        this.round++;
    }

    incrTracker( value : number = 1) {
        this.tracker += value;
        if(this.tracker >= 10) {
            this.mode = Modes.Showdown;
            this.round++;   //trigger new round rolls
        }
    }

    decrTracker() {
        let reward = this.rewardSvc.get(RewardTypes.Tracker);
        if(!reward) return;
        this.tracker = this.tracker - 1;
    }

    onContraptionEvent( event : any ) {
        if("part:added" === event) {
            this.previewPart = null;
        }
    }

    onPlayerEvent($event : PlayerEvent) {
        switch($event.type) {
            case 'tracker' : this.tracker += $event.value; break;
            case 'action'  : this.bankedActions += $event.value; break;
        }
    }

    onLocationEvent( location : Location ) {

    }

    preview() {
        let reward = this.rewardSvc.get(RewardTypes.Part);
        if(!reward) return;
        this.previewPart = PartFactory();
    }

    addReward( reward : Reward ) {
        if(this.bankedActions > 0) {
            this.bankedActions -= 1;
            this.rewardSvc.add(reward);
            if(RewardTypes.Tracker === reward.type) {
                this.decrTracker();
                return;
            }
        }
    }

}
