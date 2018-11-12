import {
    Component, OnInit, OnDestroy, Input, Output, EventEmitter
} from '@angular/core';
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

    private confirming : { key: number, value: boolean } = {} as { key: number, value: boolean };

    constructor(
        private afs : FirestoreService,
        private modalService : ModalService
    ) { }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.character = null;
        this.afs = null;
        this.modalService = null;
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
        const ref = this.modalService.createComponentRef(AbilityChooserComponent);
        ref.instance.abilities = [];
        ref.instance.onClose = (event) => {
            this.modalService.destroyRef(ref, 0);
            if(event.apply) {
                this.add(event.value as Ability);
            }
        };

        const element = this.modalService.getDomElementFromComponentRef(ref);
        this.modalService.addChild(element);

        this.getAvailable().then( options => {
            ref.instance.abilities = options;
        });
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
