import {
    Component, OnInit, OnDestroy, Input, Output, EventEmitter
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from "rxjs";

import { FirestoreService } from '../firestore.service';
import { SOBCharacter, Modifier, Option, SPECIAL_CLASSES } from "../models/character.model";
import { SOBError } from "../models/error";

import { FactionChooserComponent } from './chooser/chooser.component';

@Component({
  selector: 'factions',
  templateUrl: './faction.component.html',
  styleUrls: ['./faction.component.less']
})
export class FactionComponent implements OnInit {

    @Input() character: SOBCharacter;
    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();
    @Output() onError : EventEmitter<any> = new EventEmitter<any>();

    public label : string = "Faction";
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
        if('Assassin' === this.character.class) {
            this.label = "Clan";
        }
    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        this.character = null;
        this.afs = null;
    }

    add(faction) {
        //prevent FS error when setting undefined values
        if(typeof(faction.desc) === 'undefined') delete faction.desc;
        if(typeof(faction.description) === 'undefined') delete faction.description;
        this.character.faction = faction;
        this.onSave.emit({});
    }

    remove(index) {
        if(index >= 0) {
            delete this.confirming[index];
            this.character.faction = null;
            this.onSave.emit({});
        }
    }

    getChooserOptions() {
        let method = null, className = this.character.class;
        if('Assassin' === className) method = 'getNinjaClans';
        else if('Trederran Veteran' === className) method = 'getTrederranFactions';
        if(!method) return Promise.resolve([] as Option[]);
        return this.afs[method]();
    }

    openChooser() {
        this.getChooserOptions().then( options => {
            let opts = {
                data: {
                    options: options
                }
            };
            const dialogRef = this.dialog.open(FactionChooserComponent, opts);
            this.subscription = dialogRef.afterClosed().subscribe( ( result : Option ) => {
                if(result) {
                    this.add(result);
                }
                this.subscription.unsubscribe();
                this.subscription = null;
            });
        });

        // const ref = this.modalService.createComponentRef(FactionChooserComponent);
        // ref.instance.options = [];
        // ref.instance.onClose = (event) => {
        //     this.modalService.destroyRef(ref, 0);
        //     if(event.apply) {
        //         this.add(event.value as Option);
        //     }
        // };
        //
        // const element = this.modalService.getDomElementFromComponentRef(ref);
        // this.modalService.addChild(element);
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
