import {
    Component, OnInit, OnChanges, OnDestroy,
    SimpleChanges, SimpleChange,
    Input, Output, EventEmitter, Inject
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from "rxjs";

import { FirestoreService } from '../../firestore.service';
import { SOBCharacter, GamblerTrick } from '../../models/character.model';
import { GamblerTricksChooserComponent } from './chooser/chooser.component';

@Component({
  selector: 'gambler-tricks',
  templateUrl: './gambler-tricks.component.html',
  styleUrls: ['./gambler-tricks.component.less']
})
export class GamblerTricksComponent implements OnInit {

    @Input() character : SOBCharacter;
    @Input() modifiers: { value:number, sources: string[] };
    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();

    public maxFortune: number = 0;
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
        this.maxFortune = this.maxFortune || this.character.fortune.max;
    }

    ngOnChanges(changes : SimpleChanges) {
        if(changes.modifiers) {
            this.maxFortune = this.character.fortune.max;

            let mod = changes.modifiers.currentValue;
            if(mod && !isNaN(mod.value))
                this.maxFortune += (mod.value*1);
        }
    }
    ngOnDestroy() {
        this.character = null;
        this.modifiers = null;
        this.maxFortune = null;
        this.afs = null;
    }

    add(trick) {
        this.character.tricks.push(trick);
        this.onSave.emit({type:"gamblerTrick",value:trick});
    }

    remove(index) {
        if(index >= 0) {
            delete this.confirming[index];
            let rem = this.character.tricks.splice(index, 1);
            this.onSave.emit({type:"gamblerTrick",value:rem});
        }
    }

    gainXP(amount) {
        if(amount) {
            this.character.xp += amount*1;
            this.onSave.emit({});
        }
    }

    hasFortune() {
        return this.character.fortune.current > 0;
    }
    spendFortune() {
        if(this.character.fortune.current > 0) {
            this.character.fortune.current -= 1;
            this.onSave.emit({});
        }
    }

    resetFortune() {
        this.character.fortune.current = this.maxFortune;
        this.onSave.emit({});
    }

    getAvailableTricks () {
        let takenNames = (this.character.tricks||[]).map(a=>a.name);
        return this.afs.getGamblerTricks().then( (tricks:GamblerTrick[]) => {
            return tricks.filter( a => {
                //return only those that can be chosen multiple times
                // or haven't already been chosen
                return takenNames.indexOf(a.name)<0;
            });
        });
    }

    openChooser() {
        this.getAvailableTricks().then( options => {
            let opts = {
                data: {
                    options: options
                }
            };
            const dialogRef = this.dialog.open(GamblerTricksChooserComponent, opts);
            this.subscription = dialogRef.afterClosed().subscribe( ( result : GamblerTrick ) => {
                if(result) {
                    this.add(result);
                }
                this.subscription.unsubscribe();
                this.subscription = null;
            });
        });
        // const ref = this.modalService.createComponentRef(GamblerTricksChooserComponent);
        // ref.instance.options = [];
        // ref.instance.onClose = (event) => {
        //     this.modalService.destroyRef(ref, 0);
        //     if(event.apply) {
        //         this.add(event.value as GamblerTrick);
        //     }
        // };
        //
        // const element = this.modalService.getDomElementFromComponentRef(ref);
        // this.modalService.addChild(element);
        // this.getAvailableTricks().then( options => {
        //     ref.instance.options = options;
        // });
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
