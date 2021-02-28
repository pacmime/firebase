import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Henchmen } from './henchmen/henchmen';
import { ATEAM } from "./player/team";
import { PlayerEvent } from './player/player.component';
import { Location, LocationFactory } from './location/location';
import { Contraption } from './contraption/contraption';
import { Part, PartFactory, buildDeck } from './parts/part';
import { Slot } from './slot/slot';
import { RewardsService } from './reward.service';
import {
    Modes, Difficulties, Team,
    Reward, RewardTypes, RewardTypeLabels, RewardTypeIcons
} from './models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {

    public beginAnim : boolean = false;
    public difficulty : number = Difficulties.Normal;
    public team : any[] = [];
    public locations : Location[] = [];
    public contraption : Contraption;
    public round: number = 0;
    public tracker : number = 0;
    public RewardTypes = RewardTypes;
    public mode : any = Modes.Intro;
    public Modes = Modes;
    public won : boolean = false;
    public showHelp : boolean = false;
    public previewPart : Part;
    public placeholderPart : Part = new Part(
        "Part Name", new Slot(3), new Reward(RewardTypes.Damage, 1),
        { top: true, bottom: true, left: true, right: true }
    );
    public bankedActions : number = 0;
    public rewards : Reward[] = [];

    public actionChoice : RewardTypes;
    public actionChoices : Reward[] = [];
    public Icons = RewardTypeIcons;
    private rewardSub : Subscription;

    private partsDeck : Part[];


    constructor( public rewardSvc : RewardsService ) {

    }

    ngOnInit() {

        this.actionChoices.push(new Reward(RewardTypes.Damage));
        this.actionChoices.push(new Reward(RewardTypes.Part));
        this.actionChoices.push(new Reward(RewardTypes.Tracker));

        setTimeout(() => { this.beginAnim = true; }, 500);

        this.rewardSub = this.rewardSvc.subscribe(() => {
            // console.log("Reward was added!");
            setTimeout( () => {

                //if list has tracker reward, apply it...
                this.checkAndDecrementTracker();

                //update list of rewards for display
                this.rewards = this.rewardSvc.list();
            });
        });
    }

    ngOnDestroy() {
        this.won = false;
        this.mode = Modes.Intro;
        this.rewardSub.unsubscribe();
        this.rewardSub = null;
        this.team = [];
        this.locations = [];
        this.bankedActions = 0;
        this.rewards = [];
        this.rewardSvc.clear();
        this.rewardSvc = null;
        this.rewards = null;
        this.previewPart = null;
        this.placeholderPart = null;
        this.tracker = 0;
        this.contraption = null;
    }

    startGame() {

        // console.log("Difficulty: " + this.difficulty);

        this.team.push(Team.Hannibal);
        this.team.push(Team.Faceman);
        this.team.push(Team.BA);
        this.team.push(Team.Murdock);

        //generate locations (number based upon difficulty)
        for(let i=0; i < this.difficulty; ++i) {
            this.locations.push( LocationFactory() );
        }

        //generate new deck of parts (size based upon difficulty)
        this.partsDeck = buildDeck(
            Difficulties.Normal === this.difficulty ? 30 :
            (Difficulties.Hard   === this.difficulty ? 25 : 20)
        );
        // console.log("Parts: ");
        // this.partsDeck.forEach((part) => {
        //     let c = part.connectors;
        //     console.log(`${part.name} : ${part.reward.value} (${c.top}/${c.right}/${c.bottom}/${c.left})`);
        // });

        this.contraption = new Contraption();

        //advance round marker
        this.nextRound();

        //make sure we're in Plan game mode
        this.mode = Modes.Plan;
    }

    /** */
    nextRound() {

        this.rewardSvc.clear();

        if( !this.locations.find( loc => !loc.complete ) ) {
            //if all locations have been closed, move to showdown
            this.mode = Modes.Showdown;
        } else {
            this.tracker++; //bump tracker if any locations still open
        }
        this.round++;

        //check of tracker has reached it's end
        if(this.tracker >= 10) {
            this.mode = Modes.End;
            this.won = false;
        }
    }

    // incrTracker( value : number = 1) {
    //     this.tracker += value;
    //     if(this.tracker >= 10) {
    //         this.mode = Modes.Showdown;
    //         this.round++;   //trigger new round rolls
    //     }
    // }

    checkAndDecrementTracker() {
        while( this.rewardSvc.has(RewardTypes.Tracker) ) {
            let reward = this.rewardSvc.get(RewardTypes.Tracker);
            this.tracker = this.tracker - (reward.value || 1);
        }
    }

    onActionChosen( type : RewardTypes ) {
        this.addReward(new Reward(type));
    }

    onContraptionEvent( event : any ) {
        if("part:added" === event) {
            this.previewPart = null;
        }
    }

    /** */
    onPlayerEvent($event : PlayerEvent) {
        switch($event.type) {
            case 'tracker' :
            setTimeout(() => { this.tracker += $event.value; });
            break;

            case 'action'  :
            setTimeout(() => { this.bankedActions += $event.value; });
            break;
        }
    }

    /** */
    onLocationEvent( location : Location ) {

    }

    /** */
    preview() {
        let reward = this.rewardSvc.get(RewardTypes.Part);
        if(!reward) return;
        // this.previewPart = PartFactory();

        if(!this.partsDeck.length) {
            alert("Ooops! Out of Parts!");
            return;
        }
        this.previewPart = this.partsDeck.pop();
    }

    /** */
    addReward( reward : Reward ) {
        if(this.bankedActions > 0) {
            this.bankedActions -= 1;
            this.rewardSvc.add(reward);
        }
    }

    /** */
    onBossEvent(success : boolean) {
        if(success) {
            this.mode = Modes.End;
            this.won = true;
        }
    }

    /** */
    restart() {
        this.won = false;
        this.mode = Modes.Intro;

        this.team = [];
        this.locations = [];
        this.bankedActions = 0;
        this.rewards = [];
        this.rewardSvc.clear();
        this.partsDeck = [];
        this.previewPart = null;
        this.tracker = 0;
        this.contraption = null;

        //go back to intro mode for difficulty selection
        this.mode = Modes.Intro;
    }
}
