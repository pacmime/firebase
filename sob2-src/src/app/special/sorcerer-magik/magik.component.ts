import {
    Component, OnInit, OnChanges, OnDestroy,
    SimpleChanges, SimpleChange,
    Input, Output, EventEmitter
} from '@angular/core';
import { Subject, Subscription } from "rxjs";

import { SOBCharacter, ElementalMagik } from '../../models/character.model';
import { FirestoreService } from '../../firestore.service';
import { ElementalMagikChooserComponent } from './chooser/chooser.component';
import { ModalService } from'../../modal.service';

@Component({
  selector: 'sorcerer-elemental-magik',
  templateUrl: './magik.component.html',
  styleUrls: ['./magik.component.less']
})
export class ElementalMagikComponent implements OnInit {

    @Input() character : SOBCharacter;
    @Input() modifiersMana: { value:number, sources: string[] };
    @Input() modifiersArcanePowder: { value:number, sources: string[] };
    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();

    public maxMana : number = 0;
    public availableMana: number = 0;
    public arcanePowder : number = 0;
    public arcanePowderMax : number = 0;

    private eventSubject : Subject<{name:string,value:any}> = new Subject();

    constructor(
        private service : FirestoreService,
        private modalService : ModalService
    ) { }

    ngOnInit() {
        this.availableMana = this.maxMana = this.character.mana;
    }

    ngOnChanges(changes : SimpleChanges) {
        if(changes.modifiersMana) {

            // if(this.maxMana === 0)
            //     this.maxMana = this.character.mana;
            //
            // let mod = changes.modifiersMana.currentValue;
            // if(mod && !isNaN(mod.value)) {
            //     if(this.maxMana == this.availableMana) {
            //          this.availableMana += (mod.value*1);
            //     }
            //     this.maxMana += (mod.value*1);
            // }
        }
        if(changes.modifiersArcanePowder) {
        }
    }

    ngOnDestroy() {
        this.character = null;
        this.modifiersMana = null;
        this.modifiersArcanePowder = null;
        this.maxMana = null;
        this.service = null;
    }


    getManaModifier() {
        if(this.modifiersMana && this.modifiersMana.value && !isNaN(this.modifiersMana.value))
            return this.modifiersMana.value*1;
        return 0;
    }

    getAvailableMana() {
        return this.availableMana + this.getManaModifier();
    }


    add(spell) {
        this.character.elementalMagik.push(spell);
        this.onSave.emit({ type:'elementalMagik', value: this.character.elementalMagik });
    }

    remove(spell) {
        let index = -1;
        this.character.elementalMagik.forEach( (t,i) => {
            if(t.name===spell.name) index = i;
        });
        if(index >= 0) {
            let rem = this.character.elementalMagik.splice(index, 1);
            this.onSave.emit({ type:'elementalMagik', value: this.character.elementalMagik });
        }
    }

    getAvailable () {
        let takenNames = this.character.elementalMagik.map(s=>s.name);
        return this.service.getElementalMagik().then( (elementalMagik:ElementalMagik[]) => {
            return elementalMagik.filter( s => { return takenNames.indexOf(s.name)<0; })
                .sort( (a,b) => {
                    if(a.type !== b.type) return a.type > b.type ? 1 : -1;
                    return a.name > b.name ? 1 : -1;
                });
        });
    }

    reset() {
        this.availableMana = this.maxMana;
        this.eventSubject.next({name:'elementalMagik:reset',value:true})
        this.onSave.emit({});
    }

    useArcanePowder() {
        this.arcanePowder = Math.max(this.arcanePowder-1,0);
    }

    resetArcanePowder() {
        let rolled = Math.ceil( Math.random() * 6 );
        if(this.modifiersArcanePowder && this.modifiersArcanePowder.value) {
            rolled += this.modifiersArcanePowder.value;
        }
        this.arcanePowder = this.arcanePowderMax = rolled;
    }

    onEvent (event) {
        switch(event.name) {
            case 'mana:spent':
                this.availableMana -= event.value*1;
                // this.eventSubject.next({ name: 'mana:available', value: this.availableMana });
            break;
            case 'powder:spent':
                this.arcanePowder -= event.value*1;
            break;
            case 'xp:gained':
                this.character.xp += event.value*1;
                this.onSave.emit({ type: 'xp', value: this.character.xp });
            break;
            case 'spell:removed': this.remove(event.value); break;
            default: console.log("Unsupported mana event " + event.name);
        }
    }

    openChooser() {
        const ref = this.modalService.createComponentRef(ElementalMagikChooserComponent);
        ref.instance.options = [];
        ref.instance.onClose = (event) => {
            this.modalService.destroyRef(ref, 0);
            if(event.apply) {
                this.add(event.value as ElementalMagik);
            }
        };
        const element = this.modalService.getDomElementFromComponentRef(ref);
        this.modalService.addChild(element);

        this.getAvailable().then( available => {
            ref.instance.options = available;
        });
    }

}
