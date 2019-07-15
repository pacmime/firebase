import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from "rxjs/Subscription";

import * as firebase from 'firebase/app';

import { Data } from '../data';
import { FirestoreService } from '../firestore.service';
import { SOBCharacter } from '../models/character.model';


@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less']
})
export class UploadComponent implements OnInit {

    public charJSON: string;
    public status: {
        type: 'error' | 'success';
        message?: string;
    };

    userSubscription: ISubscription;
    chars: Observable<any[]>;

    constructor(private service: FirestoreService) { }

    ngOnInit() {
        this.userSubscription = this.service.getUser().subscribe( user => {
            if(user) {
                this.chars = this.service.getUnmigratedChars(user.uid);
            } else {
                this.chars = null;
            }
        });
    }

    initClasses() {
        this.service.initDB();
    }


    /**
     *
     */
    importChar(charJSON : string, key ?: string) {

        let oldObj = JSON.parse(charJSON);

        this.migrateChar(oldObj)
        .then( newObj => {
            console.log("Creating: ");
            console.log(newObj);
            return this.service.createCharacter(newObj);
        })
        .then( newChar => {
            this.charJSON = null;   //empty textarea
            this.status = {
                type: "success",
                message: 'Character uploaded!'
            };
        })
        .catch(error => {
            this.status = {
                type: 'error',
                message: error.message
            };
        });
    }


    /**
     *
     */
    uploadChar() {
        this.importChar(this.charJSON);
    }


    /**
     *
     */
    migrateChar (oldObj: SOBCharacter) : Promise<SOBCharacter> {


        let newObj : SOBCharacter = {
            armor       : oldObj.armor || 0,
            avatar      : oldObj.avatar || null,
            class       : '',
            classId     : oldObj['class'],
            combat      : oldObj.combat || 2,
            darkstone   : oldObj.darkstone || 0,
            defense     : oldObj.defense || 0,
            faith       : oldObj.faith || 0,
            init        : oldObj.init || 0,
            keywords    : oldObj.keywords,
            level       : oldObj.level || 1,
            melee       : oldObj.melee || 0,
            movement    : oldObj.movement || oldObj.move || 0,
            name        : oldObj.name,
            notes       : oldObj.notes || "",
            ranged      : oldObj.ranged || 0,
            spiritArmor : oldObj.spiritArmor || 0,
            uid         : oldObj.userId,
            version     : '10',
            wealth      : oldObj.wealth || 0,
            willpower   : oldObj.willpower || 0,
            xp          : oldObj.xp || 0,
            items       : [],
            abilities   : [],
            mutations   : [],
            attacks     : [],
            corruption  : { current: 0, max: 0 },
            grit        : { current: 0, max: 0 },
            health      : { wounds: 0, max: 0 },
            sanity      : { loss: 0, max: 0 },
            sidebag     : {},
            stats       : { Agility:0, Cunning:0, Lore:0, Luck:0, Spirit:0, Strength:0 }
        };

        newObj.items = this.toArray(oldObj.items, newObj.items);
        newObj.abilities = this.toArray(oldObj.abilities, newObj.abilities);
        newObj.mutations = this.toArray(oldObj.mutations, newObj.mutations);
        newObj.attacks = this.toArray(oldObj.attacks, newObj.attacks);
        if(oldObj.sermons)
            newObj.sermons = this.toArray(oldObj.sermons, []);

        this.copyObj(oldObj.corruption, newObj.corruption);
        this.copyObj(oldObj.grit, newObj.grit);
        this.copyObj(oldObj.health, newObj.health);
        this.copyObj(oldObj.sanity, newObj.sanity);
        this.copyObj(oldObj.sidebag, newObj.sidebag);
        this.copyObj(oldObj.stats, newObj.stats);

        return this.service.getClass(oldObj.class).then(classObj => {
            newObj.class = classObj.name;
            return newObj;
        });
    }




    toArray (srcObj, destArr) {
        for( var prop in srcObj ) {
            if(srcObj.hasOwnProperty(prop)) {
                let value = srcObj[prop];
                if(typeof(value) === 'object') {
                    value = this.copyObj(value, {});
                }
                destArr[destArr.length] = value;
            }
        }
        return destArr;
    }

    copyObj (src, dest) {
        for( var prop in src ) {
            if(src.hasOwnProperty(prop)) {

                let value = src[prop];

                if('modifiers' === prop) {
                    dest.modifiers = [];
                    this.toArray(value, dest.modifiers);

                } else {

                    if(typeof(value) === 'object') {
                        dest[prop] = {};
                        this.copyObj(value, dest[prop]);
                    } else if(typeof(value) === 'string' ||
                        typeof(value) === 'number') {
                        dest[prop] = value;
                    }
                }
            }
        }
        return dest;
    }



    exportDB() {
        this.service.exportDB();
    }

    exportClasses() {
        this.service.exportClasses();
    }

}
