import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ISubscription } from "rxjs/Subscription";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import { FirestoreService } from '../firestore.service';
import { SOBCharacter } from '../models/character.model';
import { SOBError } from '../models/error';

interface IMessage {
    id: number;
    title: string;
    value: string;
    canDismiss: boolean;
}


@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.less']
})
export class CharacterComponent implements OnInit {

    @Input() charId:string;

    public character: SOBCharacter;
    public isPreacher: boolean = false;
    public isShaman: boolean = false;
    public isSamurai: boolean = false;
    public isGambler: boolean = false;
    public isOrphan: boolean = false;
    public xpLevels: number[] = [0, 500, 1000, 2000, 3000, 4500, 6000];
    public isEditingBio: boolean = false;
    public editableBio: any = null;
    public modifiers: any = {};
    public error : SOBError = null; //new SOBError("test", "This is a test");
    public messages: IMessage[] = [] as IMessage[];
    private savingTimer : any;

    constructor(private service: FirestoreService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {

        let loadMsg : IMessage = null;

        if(this.route.paramMap && this.route.paramMap.switchMap) {
            this.route.paramMap
                .switchMap((params: ParamMap) => {

                    loadMsg = this.createMessage(
                        "Loading character",
                        "This should only take a moment...",
                        false
                    );
                    this.messages.push(loadMsg);


                    let id = params.get('id');
                    this.charId = id;
                    return this.service.loadCharacter(id);
                })
                .subscribe( (character: SOBCharacter) => {

                    setTimeout( () => {
                        //clear loading message
                        this.removeMessage(loadMsg);
                    }, 1000);

                    //charSubscription above will handle getting characters from the service
                    // but this subscribe is necessary to get the actual event from the
                    // Observable from the service
                    // console.log("char event");
                    this.character = character;
                    this.init();
                });
        }
    }

    ngOnDestroy() {
        this.charId = null;
        this.character = null;
        this.isPreacher = false;
        this.isShaman = false;
        this.isSamurai = false;
        this.isGambler = false;
        this.xpLevels = null;
        this.isEditingBio = false;
        this.editableBio = null;
        this.modifiers = null;
    }

    init () {
        this.isPreacher = 'Preacher' === this.character.class;
        this.isGambler = 'Gambler' === this.character.class;
        this.isShaman = 'Dark Stone Shaman' === this.character.class;
        this.isSamurai = 'Wandering Samurai' === this.character.class;
        this.isOrphan = 'Orphan' === this.character.class;
        this.ensureProperties();
        this.refreshModifiers();
    }

    refreshModifiers() {
        this.modifiers = this.service.getCharacterModifiers(this.character);
        // console.log("Character Component: Modifiers being applied:");
        // console.log(this.modifiers);
        // console.log("-------------------------");
    }

    ensureProperties () {
        if(!this.character.attacks) this.character.attacks = [];
        if(!this.character.mutations) this.character.mutations = [];
        if(!this.character.items) this.character.items = [];
        if(!this.character.abilities) this.character.abilities = [];
        if(!this.character.sidebag) this.character.sidebag = {};
        if(isNaN(this.character.sidebag.capacity))
            this.character.sidebag.capacity = 5;
        this.character.notes = this.character.notes || "";
        if(this.isPreacher && !this.character.sermons) this.character.sermons = [];
        if(this.isSamurai && !this.character.tactics) this.character.tactics = [];
        if(this.isGambler && !this.character.tricks) this.character.tricks = [];
        if(this.isShaman && !this.character.spells) this.character.spells = [];
    }

    editBio() {
        this.editableBio = {
            name: this.character.name,
            keywords: this.character.keywords || ""
        };
        this.isEditingBio=true;
    }
    cancelBioEdit() {
        this.editableBio = null;
        this.isEditingBio = false;
    }

    /**
     *
     */
    saveBio() {
        this.character.name = this.editableBio.name;
        this.character.keywords = this.editableBio.keywords;
        this.editableBio = null;
        this.isEditingBio = false;
        this.scheduleSave();
    }

    /**
     *
     */
    saveChar(key, arg) {
        this.refreshModifiers();

        // console.log("Character change event:" + (key?key + " => ":"") + JSON.stringify(arg));

        //
        //check to see if character leveled up
        if(key && 'xp' === key) {
            let neededXP = this.xpLevels[this.character.level];
            if(arg.value >= neededXP) {
                this.messages.push(
                    this.createMessage(
                        "Level Up!",
                        "Choose a class ability and roll for a new level-up ability"
                    )
                );
                this.character.level++;
                arg.value -= neededXP;  //reset
            }
        }


        //Could use arg.type as key, but need to not process things like
        // add/remove spells, etc like we would process changing literal values

        if(key) {
            //if can't apply the change, don't bother saving the character
            try {
                if(!this.applyChange(key, arg.value)) return;
            } catch(e) {
                this.error = new SOBError("save",
                    "Unable to apply change(s) to character, because " + e.message);
                return;
            }
        }

        this.scheduleSave();
    }

    /**
     *
     */
    applyChange (key, value) {

        let steps = key.split(".");
        if(steps.length === 1) {

            // if(typeof(this.character[key]) === 'undefined') {
            //     console.log("Nothing at path: " + key);
            //     return false;
            // }
            this.character[key] = value;
            return true;
        }

        //pathed variant (ie: 'prop.next.leaf')
        let i = 0, obj = this.character;
        while(i < steps.length-1) {
            obj = obj[steps[i]];
            if(!obj) {
                console.log("Invalid path being updated: " + key);
                return false;
            }
            i++;
        }
        if(obj === null || obj === undefined) {
            // console.log("Nothing at path: " + key);
            return false;
        } else if(typeof(obj) !== 'object') {
            // console.log("Path points to primitive value: " + key);
            return false;
        }
        obj[steps[steps.length-1]] = value;
        return true;

    }


    scheduleSave () {
        //do the actual save in a timeout so we don't block the UI waiting for
        // the service to complete
        if(this.savingTimer) {
            clearTimeout(this.savingTimer);
            this.savingTimer = null;
        }
        this.savingTimer = setTimeout( () => {
            this.savingTimer = null;
            this.doSave();
        }, 100);
    }


    doSave() {
        let savingMsg = this.createMessage(
            'Saving changes', 'this should only take a moment...', false);
        this.messages.push(savingMsg);

        //set timer for saves that take too long...
        let timeoutMsg = null;
        let timer = setTimeout( () => {
            this.removeMessage(savingMsg);
            timeoutMsg = this.createMessage(
                'Save Timed Out', 'Saving is taking a really long time...', true);
            this.messages.push(timeoutMsg);
        }, 5000);


        // console.log(`Saving character ${this.charId}...`);
        // console.log(this.character);
        this.service.updateCharacter(this.charId, this.character)
        .then( () => {

            if(timer) clearTimeout(timer);
            else if(timeoutMsg) this.removeMessage(timeoutMsg);

            this.removeMessage(savingMsg);

            let savedMsg = this.createMessage('Changes saved!', 'this will go away shortly', false);
            this.messages.push(savedMsg);
            setTimeout( () => { this.removeMessage(savedMsg); }, 3000);
        })
        .catch(e => {
            if(timer) clearTimeout(timer);
            else if(timeoutMsg) this.removeMessage(timeoutMsg);

            this.removeMessage(savingMsg);
            this.error = new SOBError("save",
                "Unable to save character changes, because " + e.message);
        });
    }


    getWeightLimit() {
        let value = this.character.stats.Strength + 5;
        (this.modifiers||[]).forEach( mod => {
            if(mod.affects === 'Strength') {
                value += (mod.value*1);
            }
        })
        return value;
    }

    hasDynamiteSatchel () {
        let satchel = this.character.items.find( it => it.name === "Dynamite Satchel");
        return satchel && satchel.equipped;
    }


    createMessage(title: string, message: string, canDismiss?: boolean) {
        let msg : IMessage = {
            title: title,
            value: message,
            id: Math.round(Math.random()*9999),
            canDismiss: typeof(canDismiss) !== 'undefined' ? canDismiss : true
        };
        return msg;
    }

    removeMessage(arg: any) {
        let idx = -1;
        if(arg && arg.id) {
            this.messages.forEach( (msg : IMessage,i:number) => {
                if(arg.id === msg.id) idx = i;
            });
        } else if(arg && typeof(arg) === 'number') {
            this.messages.forEach( (msg : IMessage,i:number) => {
                if(arg === msg.id) idx = i;
            });
        }
        if(idx >= 0) {
            this.messages.splice(idx, 1);
        }
    }

}
