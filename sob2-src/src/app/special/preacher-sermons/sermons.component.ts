import {
    Component, OnInit, OnChanges, OnDestroy,
    SimpleChanges, SimpleChange,
    Input, Output, EventEmitter
} from '@angular/core';
import { Subject } from 'rxjs';
import { ISubscription } from "rxjs/Subscription";

import { SOBCharacter, Sermon } from '../../models/character.model';
import { FirestoreService } from '../../firestore.service';
import { SermonsChooserComponent } from './chooser/chooser.component';
import { ModalService } from'../../modal.service';

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

    private eventSubject : Subject<{name:string,value:any}> = new Subject();

    constructor(
        private service : FirestoreService,
        private modalService : ModalService
    ) { }

    ngOnInit() {
        this.maxFaith = this.maxFaith || this.character.faith;
        this.availableFaith = this.character.faith;
    }

    ngOnChanges(changes : SimpleChanges) {
        if(changes.modifiers) {
            this.maxFaith = this.character.faith;

            let mod = changes.modifiers.currentValue;
            if(mod && !isNaN(mod.value))
                this.maxFaith += (mod.value*1);
        }
    }

    ngOnDestroy() {
        this.character = null;
        this.modifiers = null;
        this.maxFaith = null;
        this.service = null;
    }


    add(sermon) {
        this.character.sermons.push(sermon);
        this.onSave.emit({});
    }

    remove(sermon) {
        let index = -1;
        this.character.sermons.forEach( (t,i) => {
            if(t.name===sermon.name) index = i;
        });
        if(index >= 0) {
            let rem = this.character.sermons.splice(index, 1);
            this.onSave.emit({});
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
                this.onSave.emit({});
            break;
            default: console.log("Unsupported sermon event " + event.name);
        }
    }

    openChooser() {
        const ref = this.modalService.createComponentRef(SermonsChooserComponent);
        ref.instance.options = [];
        ref.instance.onClose = (event) => {
            this.modalService.destroyRef(ref, 0);
            if(event.apply) {
                this.add(event.value as Sermon);
            }
        };
        const element = this.modalService.getDomElementFromComponentRef(ref);
        this.modalService.addChild(element);

        this.getAvailable().then( available => {
            ref.instance.options = available;
        });
    }

}
