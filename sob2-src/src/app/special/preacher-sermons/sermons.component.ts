import {
    Component, OnInit, OnChanges, OnDestroy,
    SimpleChanges, SimpleChange,
    Input, Output, EventEmitter
} from '@angular/core';
import { Subject, Subscription } from "rxjs";
import { MatDialog } from '@angular/material/dialog';

import { SOBCharacter, Sermon } from '../../models/character.model';
import { FirestoreService } from '../../firestore.service';
import { SermonsChooserComponent } from './chooser/chooser.component';
// import { ModalService } from'../../modal.service';

@Component({
  selector: 'preacher-sermons',
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.less']
})
export class PreacherSermonsComponent implements OnInit {

    @Input() character : SOBCharacter;
    @Input() modifiers: { value:number, sources: string[] };
    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();

    public maxFaith : number = 0;
    public availableFaith: number = 0;
    public  dialog    : MatDialog;
    private subscription : Subscription;
    private eventSubject : Subject<{name:string,value:any}> = new Subject();

    constructor(
        private service : FirestoreService,
        dialog ?: MatDialog
    ) {
        if(dialog) this.dialog = dialog;
    }

    ngOnInit() {
        this.availableFaith = this.maxFaith = this.character.faith;
    }

    ngOnChanges(changes : SimpleChanges) {
        if(changes.modifiers) {

            // if(this.maxFaith === 0)
            //     this.maxFaith = this.character.faith;
            //
            // let mod = changes.modifiers.currentValue;
            // if(mod && !isNaN(mod.value)) {
            //     if(this.maxFaith == this.availableFaith) {
            //          this.availableFaith += (mod.value*1);
            //     }
            //     this.maxFaith += (mod.value*1);
            // }
        }
    }

    ngOnDestroy() {
        this.character = null;
        this.modifiers = null;
        this.maxFaith = null;
        this.service = null;
    }


    getFaithModifier() {
        if(this.modifiers && this.modifiers.value && !isNaN(this.modifiers.value))
            return this.modifiers.value*1;
        return 0;
    }

    getAvailableFaith() {
        return this.availableFaith + this.getFaithModifier();
    }


    add(sermon) {
        this.character.sermons.push(sermon);
        this.onSave.emit({ type:'sermons', value: this.character.sermons });
    }

    remove(sermon) {
        let index = -1;
        this.character.sermons.forEach( (t,i) => {
            if(t.name===sermon.name) index = i;
        });
        if(index >= 0) {
            let rem = this.character.sermons.splice(index, 1);
            this.onSave.emit({ type:'sermons', value: this.character.sermons });
        }
    }

    getAvailable () {
        let takenNames = this.character.sermons.map(s=>s.name);
        return this.service.getSermons().then( (sermons:Sermon[]) => {
            return sermons.filter( s => { return takenNames.indexOf(s.name)<0; });
        });
    }

    resetSermons() {
        this.availableFaith = this.maxFaith;
        this.eventSubject.next({name:'sermons:reset',value:true})
        this.onSave.emit({});
    }

    onEvent (event) {
        switch(event.name) {
            case 'faith:spent':
                this.availableFaith -= event.value*1;
                // this.eventSubject.next({ name: 'faith:available', value: this.availableFaith });
            break;
            case 'xp:gained':
                this.character.xp += event.value*1;
                this.onSave.emit({ type: 'xp', value: this.character.xp });
            break;
            case 'sermon:removed': this.remove(event.value); break;
            default: console.log("Unsupported sermon event " + event.name);
        }
    }

    openChooser() {
        // const ref = this.modalService.createComponentRef(SermonsChooserComponent);
        // ref.instance.options = [];
        // ref.instance.onClose = (event) => {
        //     this.modalService.destroyRef(ref, 0);
        //     if(event.apply) {
        //         this.add(event.value as Sermon);
        //     }
        // };
        // const element = this.modalService.getDomElementFromComponentRef(ref);
        // this.modalService.addChild(element);
        //
        // this.getAvailable().then( available => {
        //     ref.instance.options = available;
        // });

        this.getAvailable().then( available => {

            let opts = {
                data: {
                    options: available
                }
            };
            const dialogRef = this.dialog.open(SermonsChooserComponent, opts);
            this.subscription = dialogRef.afterClosed().subscribe( ( result : Sermon ) => {
                if(result) {
                    this.add(result);
                }
                this.subscription.unsubscribe();
                this.subscription = null;
            });

        });
    }

}
