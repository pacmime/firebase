import {
    Component, OnInit, OnChanges, OnDestroy,
    SimpleChanges, SimpleChange,
    Input, Output, EventEmitter
} from '@angular/core';
import { FirestoreService } from '../../firestore.service';
import { SOBCharacter, SamuraiTactic, Modifier } from "../../models/character.model";
import { SamuraiTacticsChooserComponent } from './chooser/chooser.component';

import { ModalService } from'../../modal.service';

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
    private confirming : { key: number, value: boolean } = {} as { key: number, value: boolean };

    constructor(
        private afs : FirestoreService,
        private modalService : ModalService
    ) { }

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

    getAvailable () {
        let takenNames = (this.character.tactics||[]).map(a=>a.name);
        return this.afs.getSamuraiTactics().then( (tactics:SamuraiTactic[]) => {
            return tactics.filter( a => {
                //return only those that can be chosen multiple times
                // or haven't already been chosen
                return takenNames.indexOf(a.name)<0;
            });
        });
    }

    openChooser() {
        const ref = this.modalService.createComponentRef(SamuraiTacticsChooserComponent);
        ref.instance.options = [];
        ref.instance.onClose = (event) => {
            this.modalService.destroyRef(ref, 0);
            if(event.apply) {
                this.add(event.value as SamuraiTactic);
            }
        };

        const element = this.modalService.getDomElementFromComponentRef(ref);
        this.modalService.addChild(element);

        this.getAvailable().then( options => {
            ref.instance.options = options;
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
