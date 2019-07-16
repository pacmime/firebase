import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { ISubscription } from "rxjs/Subscription";
// import 'rxjs/add/operator/switchMap'
import { switchMap} from 'rxjs/operators';

import * as firebase from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { SOBUser } from './models/user.model';
import {
    SOBCharacter,
    Sermon,
    SamuraiTactic,
    ShamanSpell,
    GamblerTrick,
    OrphanMission,
    ElementalMagik,
    Ability
} from './models/character.model';

import { Data } from './data_new';

const CLASSES_PATH = '/games/sob/classes';
const INJURIES_PATH = '/games/sob/injuries';
const MUTATIONS_PATH = '/games/sob/mutations';
const SERMONS_PATH = '/games/sob/sermons';
const SHAMAN_SPELLS_PATH = '/games/sob/shamanSpells';
const GAMBLER_TRICKS_PATH = '/games/sob/gamblingTricks';
const WANDERING_SAMURAI_TACTICS_PATH = '/games/sob/wanderingSamuraiTactics';
const SAMURAI_WARRIOR_BATTLE_TACTICS_PATH = '/games/sob/samuraiWarriorBattleTactics';
const ORPHAN_MISSIONS_PATH = '/games/sob/orphanMissions';
const ELEMENTAL_MAGIK_PATH = '/games/sob/elementalMagik';
const NINJA_CLANS_PATH = '/games/sob/ninjaClans';
const TREDERRAN_FACTIONS_PATH = '/games/sob/trederranFactions';
const MADNESS_PATH = '/games/sob/madness';
const CHAR_PATH = '/games/sob/chars';
const OLD_CHAR_PATH = '/games/sob/oldChars';

@Injectable()
export class FirestoreService {

    user: Observable<firebase.User>;
    character: SOBCharacter;

    private charObs: Observable<SOBCharacter>;
    private charSubject: Subject<SOBCharacter>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {

        this.user = this.afAuth.authState;

        this.charSubject = new Subject<SOBCharacter>();
        this.charObs = this.charSubject.asObservable();
    }

    isAuthenticated(): boolean {
        return this.user !== null;
    }

    getUser() : Observable<firebase.User> {
        return this.user;
    }


    initDB () {
        this.initClasses();
        this.populateItems(Data.MUTATIONS, MUTATIONS_PATH);
        this.populateItems(Data.INJURIES, INJURIES_PATH);
        this.populateItems(Data.MADNESS, MADNESS_PATH);
        this.populateItems(Data.SERMONS, SERMONS_PATH);
        this.populateItems(Data.WANDERING_SAMURAI_TACTICS, WANDERING_SAMURAI_TACTICS_PATH);
        this.populateItems(Data.SHAMAN_SPELLS, SHAMAN_SPELLS_PATH);
        this.populateItems(Data.GAMBLER_TRICKS, GAMBLER_TRICKS_PATH);
        this.populateItems(Data.ORPHAN_MISSIONS, ORPHAN_MISSIONS_PATH);
        this.populateItems(Data.ELEMENTAL_MAGIK, ELEMENTAL_MAGIK_PATH);
        this.populateItems(Data.NINJA_CLANS, NINJA_CLANS_PATH);
        this.populateItems(Data.SAMURAI_WARRIOR_BATTLE_TACTICS, SAMURAI_WARRIOR_BATTLE_TACTICS_PATH);
        this.populateItems(Data.TREDERRAN_FACTIONS, TREDERRAN_FACTIONS_PATH);
    }

    initClasses() {

        let classes = Data.CLASSES;
        for(let i=0; i<classes.length; ++i) {
            let cls = classes[i];

            let docRef = this.afs.collection<any>(CLASSES_PATH).doc(cls.classId);
            docRef.snapshotChanges().take(1).toPromise().then(doc => {
                return doc.payload.exists ? docRef.update(cls) : docRef.set(cls);
            })
            .catch(err => {
               console.log("Error initializing " + cls.name);
            });

        }
    }


    populateItems(items, path) {
        items.forEach(item => {
            let docRef = this.afs.collection<any>(path).doc(item.name);
            docRef.snapshotChanges().take(1).toPromise().then(doc => {
                return doc.payload.exists ? docRef.update(item) : docRef.set(item);
            })
            .catch(err => {
                console.log("Error initializing " + path + " : " + item.name);
                console.log("   `-> " + err.message);
            });
        });
    }




    //SOBCharacter methods

    getCurrentCharacter() : SOBCharacter {
        return this.character;
    }

    getCharacterModifiers( character? : SOBCharacter ) {
        let result = [];
        let char = character || this.getCurrentCharacter();
        if(char) {
            this.getModifiersFrom(result, char.items||[],      true);
            this.getModifiersFrom(result, char.abilities||[],  false);
            //covers madness/injuries too
            this.getModifiersFrom(result, char.mutations||[],  false);
            this.getModifiersFrom(result, [ {modifiers: char.temporaryMods||[]}],  false);
            if(char.faction) {
                this.getModifiersFrom(result, [char.faction], false);
            }
        }
        return result;
    }

    getModifiersFrom(results: any[],
                     sources: any[],
                     mustBeEquipped:boolean=true) {

        sources.forEach( src => {

            //only bother if the src is marked as equipped
            // and has modifiers associated with it
            if(src.modifiers && (!mustBeEquipped || src.equipped)) {

                src.modifiers.forEach( modifier => {

                    let modVal:number = isNaN(modifier.value) ? 0 : modifier.value*1;
                    let affected = modifier.affects;

                    if('move' === affected) affected = 'movement';

                    if(typeof(results[affected]) === 'undefined' || results[affected] === null) {
                        results[affected] = { value: 0, sources: [] };
                    }

                    if( 'armor' === affected || 'spiritArmor' === affected ||
                        'cover' === affected || 'endurance' === affected ) {
                        //these doesn't stack, so only use highest modifier value
                        results[affected].value = Math.max(results[affected].value, modVal*1);
                    } else {
                        results[affected].value += modVal;
                    }

                    results[affected].sources.push(src.name||src.label);

                });
            }
        });
    }













    // FireStore access methods


    public getCharacter( callback: (SOBCharacter) => void ) : ISubscription {
        let subscription = this.charSubject.subscribe( ( result ) => {
            // console.log(result);
            callback(result)
        });
        if(this.character) {
            this.charSubject.next(this.character);
        }
        return subscription;
    }



    getUserDocument(uid) : Observable<SOBUser> {
        return this.afs.doc('/games/sob/users/' + uid).valueChanges() as Observable<SOBUser>;
    }

    getUnmigratedChars(uid) : Observable<any[]> {
        let doc = this.afs.doc<SOBUser>('/games/sob/users/' + uid);
        return doc.collection<SOBCharacter>('oldChars')//.valueChanges();
        .snapshotChanges()
        .map(docs => {
            return docs.map(a => {
                return { json:  a.payload.doc.data().json, name: a.payload.doc.id };
            });
        });
        // return this.afs.collection<any>(OLD_CHAR_PATH,
        //     ref => ref.where('uid', '==', uid)).valueChanges();
    }

    getUserChars (uid) : Observable<SOBCharacter[]> {
        // console.log("Fetching user doc for " + uid);
        // let doc = this.afs.doc<SOBUser>('/games/sob/users/' + uid);
        // console.log("Fetching chars for " + uid);
        // return doc.collection<SOBCharacter>('chars').valueChanges();

        return this.afs.collection<SOBCharacter>(CHAR_PATH,
            ref => ref.where('uid', '==', uid)).valueChanges();
    }

    loadCharacter(charId) : Observable<SOBCharacter> {
        // console.log("Fetching character from " + CHAR_PATH + '/' + charId);
        let observable = this.afs.doc<SOBCharacter>(CHAR_PATH + '/' + charId).valueChanges();
        //cache character so it can be referenced by components directly
        observable.take(1).toPromise().then(char => {
            this.character = char;
            this.charSubject.next(char);
            return char;
        });
        return observable;
    }

    updateCharacter(charId, updates:any) : Promise<void> {
        let docRef = this.afs.collection<SOBCharacter>(CHAR_PATH).doc(charId);
        return docRef.snapshotChanges().take(1).toPromise().then(doc => {
            return doc.payload.exists ? docRef.update(updates) : docRef.set(updates);
       })
       .catch(err => {
           return Promise.reject(err);
       });
    }

    removeCharacter(charId) : Promise<void> {
        let docRef = this.afs.collection<SOBCharacter>(CHAR_PATH).doc(charId);
        return docRef.snapshotChanges().take(1).toPromise().then(doc => {
            return docRef.delete();
       })
       .catch(err => {
           return Promise.reject(err);
       });
    }

    createCharacter(json:any) : Promise<void> {
        let id = this.afs.createId();
        json.id = id;
        return this.updateCharacter(id, json);
    }

    getClasses() : Promise<SOBCharacter[]> {
        return this.afs.collection<any>(CLASSES_PATH).
            valueChanges().take(1).toPromise();
    }

    getClass( classId: string ) : Promise<SOBCharacter> {
        let docRef = this.afs.collection<any>(CLASSES_PATH).doc(classId);
        return docRef.valueChanges().take(1).toPromise() as Promise<SOBCharacter>;
    }

    /**
     * @return {Promise<Sermon[]>} resolving list of sermons
     */
    getSermons () : Promise<Sermon[]> {
        return this.afs.collection<Sermon>(SERMONS_PATH).
            valueChanges().take(1).toPromise();
    }

    /**
     * @return {Promise<OrphanMission[]>} resolving list of tactics
     */
    getOrphanMissions () : Promise<OrphanMission[]> {
        return this.afs.collection<OrphanMission>(ORPHAN_MISSIONS_PATH).
            valueChanges().take(1).toPromise();
    }

    /**
     * @return {Promise<SamuraiTactic[]>} resolving list of tactics for Wandering Samurai
     */
    getWanderingSamuraiTactics () : Promise<SamuraiTactic[]> {
        return this.afs.collection<SamuraiTactic>(WANDERING_SAMURAI_TACTICS_PATH).
            valueChanges().take(1).toPromise();
    }
    /**
     * @return {Promise<SamuraiTactic[]>} resolving list of tactics for Daimyo
     */
    getSamuraiBattleTactics () : Promise<SamuraiTactic[]> {
        return this.afs.collection<SamuraiTactic>(SAMURAI_WARRIOR_BATTLE_TACTICS_PATH).
            valueChanges().take(1).toPromise();
    }

    /**
     * @return {Promise<GamblerTrick[]>} resolving list of tricks
     */
    getGamblerTricks () : Promise<GamblerTrick[]> {
        return this.afs.collection<GamblerTrick>(GAMBLER_TRICKS_PATH).
            valueChanges().take(1).toPromise();
    }

    /**
     * @return {Promise<ShamanSpell[]>} resolving list of tactics
     */
    getShamanSpells () : Promise<ShamanSpell[]> {
        return this.afs.collection<ShamanSpell>(SHAMAN_SPELLS_PATH).
            valueChanges().take(1).toPromise();
    }

    /**
     * @return {Promise<ShamanSpell[]>} resolving list of spells
     */
    getElementalMagik () : Promise<ElementalMagik[]> {
        return this.afs.collection<ElementalMagik>(ELEMENTAL_MAGIK_PATH).
            valueChanges().take(1).toPromise();
    }

    /**
     * @return {Promise<any[]>} resolving list of clans
     */
    getNinjaClans () : Promise<any[]> {
        return this.afs.collection<any>(NINJA_CLANS_PATH).
            valueChanges().take(1).toPromise();
    }

    /**
     * @return {Promise<any[]>} resolving list of factions
     */
    getTrederranFactions () : Promise<any[]> {
        return this.afs.collection<any>(TREDERRAN_FACTIONS_PATH).
            valueChanges().take(1).toPromise();
    }


    /**
     * @return {Promise<any[]>} resolving list of mutations
     */
    getMutations () : Promise<any[]> {
        return this.afs.collection<any>(MUTATIONS_PATH).
            valueChanges().take(1).toPromise();
    }

    /**
     * @return {Promise<any[]>} resolving list of injuries
     */
    getInjuries () : Promise<any[]> {
        return this.afs.collection<any>(INJURIES_PATH).
            valueChanges().take(1).toPromise();
    }

    /**
     * @return {Promise<any[]>} resolving list of madness
     */
    getMadness () : Promise<any[]> {
        return this.afs.collection<any>(MADNESS_PATH).
            valueChanges().take(1).toPromise();
    }

    /**
     * @param {string} classId - identifier of class to retrieve ability options
     * @return {Promise<Ability[]>} resolving list of abilities for associated class
     */
    getAbilities(classId) : Promise<Ability[]> {
        let docRef = this.afs.collection<any>(CLASSES_PATH).doc(classId);
        return docRef.valueChanges().take(1).toPromise().then(cls => {
            let c = cls as {upgrades:Ability[]};
            return c.upgrades;
        });
    }


    getAuth () {
        return this.user;
    }


    login( email : string , password : string ) : Promise<any> {

        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then( ( authState ) => {
            this.user = authState;
            return authState;
        })
        .catch( (error) => {
            console.log("Error authenticating");
            console.log(error);
            return Promise.reject(error);
        });
    }

    logout() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/login']);
        });
    }

    resetPassword( email: string ) : Promise<any> {
        return this.afAuth.auth.sendPasswordResetEmail(email);
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



    exportDB () {

        let result : {
            chars : {};
            users : {};
            orphanMissions : any[];
        } = {
            chars: {}, users: {}, orphanMissions: [] as any[]
        } as { chars : {}; users: {}; orphanMissions : any[] };

        let SOB = this.afs.doc('/games/sob');
        SOB.collection<SOBCharacter>('chars')
        .snapshotChanges()
        .map(docs => {
            return docs.map(a => {
                return { uid: a.payload.doc.id, data: a.payload.doc.data() };
            });
        }).take(1).toPromise()
        .then( chars => {
            chars.forEach( char => {
                result.chars[char.uid] = char.data;
            });

            return SOB.collection<any>('users')
            .snapshotChanges()
            .map(docs => {
                return docs.map(a => {
                    return { uid: a.payload.doc.id, data: a.payload.doc.data() };
                });
            })
            .take(1).toPromise();
        })
        .then( users => {
            users.forEach( user => { result.users[user.uid] = user.data; });
            return true;
        })
        .then( () => {
            console.log(JSON.stringify(result));
        });

    }


    exportClasses () {

        let result : {
            classes : any[];
            gamblingTricks : any[];
            orphanMissions : any[];
            samuraiTactics: any[];
            sermons: any[];
            shamanSpells: any[];
            //sorcererSpells: any[];
            injuries: any[];
            madness: any[];
        } = {
            classes : [],
            gamblingTricks : [],
            orphanMissions : [],
            samuraiTactics: [],
            sermons: [],
            shamanSpells: [],
            //sorcererSpells: [],
            injuries: [],
            madness: []
        };

        let SOB = this.afs.doc('/games/sob');

        let promises = Object.keys(result).map( key => {
            return SOB.collection<SOBCharacter>(key)
            .snapshotChanges().map(docs => docs.map( a => a.payload.doc.data() ) )
            .take(1).toPromise().then( values => {
                result[key] = values;
                return true;
            });
        })

        Promise.all(promises).then( () => {
            console.log(JSON.stringify(result));
        });

    }
}
