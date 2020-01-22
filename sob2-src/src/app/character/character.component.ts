import { Component, OnInit, OnDestroy, Input, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTab, MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material';
import { Observable, Subscription } from "rxjs";
import { switchMap } from 'rxjs/operators';

import { FirestoreService } from '../firestore.service';
import {
    SOBCharacter, SPECIAL_CLASSES, ClassFlag
} from '../models/character.model';
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

    public character : SOBCharacter;
    public charFlags : ClassFlag;
    public CLASSES = SPECIAL_CLASSES;
    public xpLevels: number[] = [0, 500, 1000, 2000, 3000, 4500, 6000];
    public isEditingBio: boolean = false;
    public editableBio: any = null;
    public modifiers: any = {};
    public error : SOBError = null; //new SOBError("test", "This is a test");
    public messages: IMessage[] = [] as IMessage[];
    private savingTimer : any;
    private snackBarRef : MatSnackBarRef<any>;

    public selectedTabIndex: number = 0;
    @ViewChildren(MatTab) mdTabList: QueryList<MatTab>;

    constructor(
        private snackBar: MatSnackBar,
        private service: FirestoreService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {

        let loadMsg : IMessage = null;

        if(this.route.paramMap) {
            this.route.paramMap.pipe(
                switchMap((params: ParamMap) => {

                    // loadMsg = this.createMessage(
                    //     "Loading character",
                    //     "This should only take a moment...",
                    //     false
                    // );
                    // this.messages.push(loadMsg);

                    this.snackBarRef = this.snackBar.open("Loading character, one moment...");


                    let id = params.get('id');
                    this.charId = id;
                    return this.service.loadCharacter(id);
                })

            ).subscribe( (character: SOBCharacter) => {

                    setTimeout( () => {
                        //clear loading message
                        // this.removeMessage(loadMsg);

                        if(this.snackBarRef) {
                            this.snackBarRef.dismiss();
                            this.snackBarRef = null;
                        }

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
        this.charFlags = null;
        this.xpLevels = null;
        this.isEditingBio = false;
        this.editableBio = null;
        this.modifiers = null;
    }

    init () {

        this.charFlags = new ClassFlag(this.character);

        // Object.keys(FLAGS).forEach( key => {
        //     let flag = FLAGS[key];
        //     if(flag.fn(this.character)) {
        //         this.charFlags = _applyFlag(this.charFlags, flag.value);
        //     }
        // })

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
        if(!this.character.temporaryMods) this.character.temporaryMods = [];

        // //class-specific properties
        // Object.keys(FLAGS).forEach( key => {
        //     let flag = FLAGS[key];
        //     if(this.hasFlag(flag.value)) {
        //         flag.init(this.character);
        //     }
        // });

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
                // this.messages.push(
                //     this.createMessage(
                //         "Level Up!",
                //         "Choose a class ability and roll for a new level-up ability"
                //     )
                // );
                this.snackBar.open("Level Up!", "Dismiss");
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

            if('temporaryMods' === key) {
                this.refreshModifiers();
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
        }, 500);
    }


    doSave() {

        // let opts : MatSnackBarConfig = {
        //     duration: 2000
        // }
        // this.snackBar.open("Loading character, one moment...", null, opts);


        // let savingMsg = this.createMessage(
        //     'Saving changes', 'this should only take a moment...', false);
        // this.messages.push(savingMsg);

        if(this.snackBarRef) {
            this.snackBarRef.dismiss();
        }
        this.snackBarRef = this.snackBar.open("Saving changes, one moment...");

        let timeoutSnackBarRef;


        //set timer for saves that take too long...
        let timeoutMsg = null;
        let timer = setTimeout( () => {
            // this.removeMessage(savingMsg);
            // timeoutMsg = this.createMessage(
            //     'Save Timed Out', 'Saving is taking a really long time...', true);
            // this.messages.push(timeoutMsg);

            timeoutSnackBarRef = this.snackBar.open("Save is taking longer than expected...");

        }, 5000);


        // console.log(`Saving character ${this.charId}...`);
        // console.log(this.character);
        this.service.updateCharacter(this.charId, this.character)
        .then( () => {

            if(timer) clearTimeout(timer);
            // else if(timeoutMsg) this.removeMessage(timeoutMsg);
            else if(timeoutSnackBarRef) timeoutSnackBarRef.dismiss();

            // this.removeMessage(savingMsg);
            this.snackBarRef.dismiss();
            this.snackBarRef = null;

            // let savedMsg = this.createMessage('Changes saved!', 'this will go away shortly', false);
            // this.messages.push(savedMsg);
            // setTimeout( () => { this.removeMessage(savedMsg); }, 3000);

            this.snackBarRef = this.snackBar.open("Changes saved!");
            setTimeout( () => {
                if(this.snackBarRef) {
                    this.snackBarRef.dismiss();
                    this.snackBarRef = null;
                }
            }, 3000);
        })
        .catch(e => {
            if(timer) clearTimeout(timer);
            // else if(timeoutMsg) this.removeMessage(timeoutMsg);
            else if(timeoutSnackBarRef) timeoutSnackBarRef.dismiss();

            // this.removeMessage(savingMsg);
            this.snackBarRef.dismiss();
            this.snackBarRef = null;

            this.error = new SOBError("save",
                "Unable to save character changes, because " + e.message);
        });
    }


    getWeightLimit() {
        let value = this.character.stats.Strength + 5;
        if(this.modifiers && this.modifiers.Strength) {
            value += (this.modifiers.Strength.value*1);
        }
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


    hasFlag (classKey : SPECIAL_CLASSES) : boolean {
        return this.charFlags && this.charFlags.hasSpecialClass(classKey);
    }

    swipe( amount : number) {
        let newIndex = this.selectedTabIndex + amount;
        let max = this.mdTabList.length;
        if( newIndex >= 0 && newIndex < max) {
            this.selectedTabIndex = newIndex;
        }
    }

}
