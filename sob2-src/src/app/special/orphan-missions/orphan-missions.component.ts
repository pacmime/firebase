import {
    Component, OnInit, OnDestroy,
    Input, Output, EventEmitter, Inject
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from "rxjs";

import { FirestoreService } from '../../firestore.service';
import { SOBCharacter, OrphanMission, Modifier } from "../../models/character.model";
import { OrphanMissionsChooserComponent } from './chooser/chooser.component';


@Component({
  selector: 'orphan-missions',
  templateUrl: './orphan-missions.component.html',
  styleUrls: ['./orphan-missions.component.less']
})
export class OrphanMissionsComponent implements OnInit {

    @Input() character : SOBCharacter;
    @Input() modifiers: { value:number, sources: string[] };
    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();

    public  dialog    : MatDialog;
    private subscription : Subscription;

    private confirming : { key: number, value: boolean } =
        {} as { key: number, value: boolean };

    constructor(
        private afs : FirestoreService,
        dialog ?: MatDialog
    ) {
        if(dialog) this.dialog = dialog;
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.character = null;
        this.modifiers = null;
        this.afs = null;
    }

    add(mission) {
        this.character.missions.push(mission);
        this.onSave.emit({});
    }

    remove(index) {
        if(index >= 0) {
            delete this.confirming[index];
            this.character.missions.splice(index, 1);
            this.onSave.emit({});
        }
    }

    getAvailable () {
        let takenNames = (this.character.missions||[]).map(a=>a.name);
        return this.afs.getOrphanMissions().then( (missions:OrphanMission[]) => {
            return missions.filter( a => {
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
            const dialogRef = this.dialog.open(OrphanMissionsChooserComponent, opts);
            this.subscription = dialogRef.afterClosed().subscribe( ( result : OrphanMission ) => {
                if(result) {
                    this.add(result);
                }
                this.subscription.unsubscribe();
                this.subscription = null;
            });
        });

        // const ref = this.modalService.createComponentRef(OrphanMissionsChooserComponent);
        // ref.instance.options = [];
        // ref.instance.onClose = (event) => {
        //     this.modalService.destroyRef(ref, 0);
        //     if(event.apply) {
        //         this.add(event.value as OrphanMission);
        //     }
        // };
        //
        // const element = this.modalService.getDomElementFromComponentRef(ref);
        // this.modalService.addChild(element);
        //
        // this.getAvailable().then( options => {
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
