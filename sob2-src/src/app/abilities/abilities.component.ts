import {
    Component, OnInit, OnDestroy, Input, Output, EventEmitter
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from "rxjs";

import { FirestoreService } from '../firestore.service';
import { SOBCharacter, Ability, Modifier } from "../models/character.model";
import { SOBError } from "../models/error";

import { ModalService } from'../modal.service';
import { AbilityChooserComponent } from './chooser/chooser.component';

@Component({
  selector: 'abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.less']
})
export class AbilitiesComponent implements OnInit {

    @Input() character: SOBCharacter;
    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();
    @Output() onError : EventEmitter<any> = new EventEmitter<any>();

    public  dialog    : MatDialog;
    private subscription : Subscription;
    private confirming : { key: number, value: boolean } = {} as { key: number, value: boolean };

    constructor(
        private afs : FirestoreService,
        dialog ?: MatDialog
    ) {
        if(dialog) this.dialog = dialog;
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        this.character = null;
        this.afs = null;
    }

    add(ability) {
        this.character.abilities.push(ability);
        this.onSave.emit({});
    }

    remove(index) {
        if(index >= 0) {
            delete this.confirming[index];
            this.character.abilities.splice(index, 1);
            this.onSave.emit({});
        }
    }

    getChooserOptions() {
        let takenNames = this.character.abilities.map(a=>a.name);
        return this.afs.getAbilities(this.character.classId)
        .then( (abilities:Ability[]) => {

            let paths = [];
            let rolled = [];
            let rest = [];
            let hasChosenPath = false;
            abilities.forEach( a => {

                if('starting' === a.type) {
                    //starting path abilities...
                    paths.push(a);

                    //note if the user has already selected a
                    // starting path ability... and see below why
                    if( takenNames.indexOf(a.name) >= 0) {
                        hasChosenPath = true;
                    }

                } else if(a.roll !== undefined || a.multi === true) {
                    //rolled abilities when leveling up
                    rolled.push(a);

                } else if( !a.multi && takenNames.indexOf(a.name) < 0 ){
                    //mark those requiring unselected abilities as disabled
                    if(a.requires && takenNames.indexOf(a.requires)<0)
                        a.disabled = true;
                    rest.push(a);
                }
            });

            //if a starting path has been chosen already,
            // then we won't bother sending any path ability options
            if(hasChosenPath) paths = [];

            return {
                paths: paths,
                rolled: rolled,
                rest: rest
            };
        });
    }

    getAvailable () {
        let takenNames = this.character.abilities.map(a=>a.name);
        return this.afs.getAbilities(this.character.classId).then( (abilities:Ability[]) => {
            return abilities.
                filter( a => {
                    //return only those that can be chosen multiple times
                    // or haven't already been chosen
                    return a.multi===true || takenNames.indexOf(a.name)<0;
                }).
                map( a => {
                    //mark those requiring unselected abilities as disabled
                    if(a.requires && takenNames.indexOf(a.requires)<0)
                        a.disabled = true;
                    return a;
                });
        });
    }

    openChooser() {
        this.getChooserOptions().then( options => {
            let opts = {
                data: {
                    options: options
                }
            };
            const dialogRef = this.dialog.open(AbilityChooserComponent, opts);
            this.subscription = dialogRef.afterClosed().subscribe( ( result : Ability ) => {
                if(result) {
                    this.add(result);
                }
                this.subscription.unsubscribe();
                this.subscription = null;
            });
        });

        // const ref = this.modalService.createComponentRef(AbilityChooserComponent);
        // ref.instance.abilities = [];
        // ref.instance.onClose = (event) => {
        //     this.modalService.destroyRef(ref, 0);
        //     if(event.apply) {
        //         this.add(event.value as Ability);
        //     }
        // };
        //
        // const element = this.modalService.getDomElementFromComponentRef(ref);
        // this.modalService.addChild(element);
        //
        // // this.getAvailable().then( options => {
        // //     ref.instance.abilities = options;
        // // });
        // this.getChooserOptions().then( options => {
        //     ref.instance.options = options;
        // })
    }


    confirmingDelete( index : number, value ?: boolean ) : boolean {
        if(typeof(value) !== 'undefined' && value !== null) {
            this.confirming[index] = value;
            return value;

        } else {
            return this.confirming[index];
        }
    }
}
