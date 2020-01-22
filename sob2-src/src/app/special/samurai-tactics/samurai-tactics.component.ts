import {
    Component, OnInit, OnChanges, OnDestroy,
    SimpleChanges, SimpleChange,
    Input, Output, EventEmitter, Inject
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from "rxjs";

import { FirestoreService } from '../../firestore.service';
import { SOBCharacter, SamuraiTactic, Modifier } from "../../models/character.model";
import { SamuraiTacticsChooserComponent } from './chooser/chooser.component';


@Component({
  selector: 'samurai-tactics',
  templateUrl: './samurai-tactics.component.html',
  styleUrls: ['./samurai-tactics.component.less']
})
export class SamuraiTacticsComponent implements OnInit {

    @Input() character : SOBCharacter;
    @Input() modifiers: { value:number, sources: string[] };
    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();

    public maxFury : number = 0;
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
        this.maxFury = this.maxFury || this.character.fury.max;
    }

    ngOnChanges(changes : SimpleChanges) {
        if(changes.modifiers) {
            this.maxFury = this.character.fury.max;

            let mod = changes.modifiers.currentValue;
            if(mod && !isNaN(mod.value))
                this.maxFury += (mod.value*1);
        }
    }

    ngOnDestroy() {
        this.character = null;
        this.modifiers = null;
        this.maxFury = null;
        this.afs = null;
    }

    add(tactic) {
        this.character.tactics.push(tactic);
        this.onSave.emit({});
    }

    remove(index) {
        if(index >= 0) {
            delete this.confirming[index];
            this.character.tactics.splice(index, 1);
            this.onSave.emit({});
        }
    }

    spendFury(fury) {
        let amount : number = fury * 1;
        if(isNaN(amount) || amount > this.character.fury.current) return;
        this.character.fury.current -= fury;
        this.onSave.emit({type: 'fury.current', value: this.character.fury.current });
    }

    getTactics() : Promise<SamuraiTactic[]> {
        if('Wandering Samurai' === this.character.class)
            return this.afs.getWanderingSamuraiTactics();
        if('Daimyo' === this.character.class ||
            'Samurai Warrior' === this.character.class)
            return this.afs.getSamuraiBattleTactics();
    }

    getAvailable () {
        let takenNames = (this.character.tactics||[]).map(a=>a.name);
        return this.getTactics().then( (tactics:SamuraiTactic[]) => {
            return tactics.filter( a => {
                //return only those that can be chosen multiple times
                // or haven't already been chosen
                return takenNames.indexOf(a.name)<0;
            });
        });
    }

    openChooser() {
        this.getAvailable().then( options => {
            let opts = {
                data: {
                    options: options
                }
            };
            const dialogRef = this.dialog.open(SamuraiTacticsChooserComponent, opts);
            this.subscription = dialogRef.afterClosed().subscribe( ( result : SamuraiTactic ) => {
                if(result) {
                    this.add(result);
                }
                this.subscription.unsubscribe();
                this.subscription = null;
            });
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
