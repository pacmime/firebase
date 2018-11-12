import {
    Component, OnInit, OnChanges, OnDestroy,
    SimpleChanges, SimpleChange,
    Input, Output, EventEmitter
} from '@angular/core';
import { FirestoreService } from '../../firestore.service';
import { SOBCharacter, ShamanSpell } from '../../models/character.model';
import { ShamanSpellsChooserComponent } from './chooser/chooser.component';
import { ModalService } from'../../modal.service';

@Component({
  selector: 'shaman-spells',
  templateUrl: './shaman-spells.component.html',
  styleUrls: ['./shaman-spells.component.less']
})
export class ShamanSpellsComponent implements OnInit, OnDestroy {

    @Input() character : SOBCharacter;
    @Input() modifiers: { value:number, sources: string[] };
    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();

    public maxMagik : number = 0;
    public confirmingDelete: boolean = false;

    constructor(
        private afs : FirestoreService,
        private modalService : ModalService
    ) { }

    ngOnInit() {
        this.maxMagik = this.maxMagik || this.character.magik.max;
    }

    ngOnChanges(changes : SimpleChanges) {
        if(changes.modifiers) {
            this.maxMagik = this.character.magik.max;

            let mod = changes.modifiers.currentValue;
            if(mod && !isNaN(mod.value))
                this.maxMagik += (mod.value*1);
        }
    }

    ngOnDestroy() {
        this.character = null;
        this.modifiers = null;
        this.maxMagik = null;
        this.afs = null;
    }

    add(spell) {
        this.character.spells.push(spell);
        this.onSave.emit({type:"shamanSpell",value:spell});
    }

    remove(arg) {
        let index = -1;
        if(typeof(arg) === 'object') {
            this.character.spells.forEach( (s,i) => {
                if(s.name === arg.name)
                    index = i;
            });
        } else if(typeof(arg) === 'number') {
            index = arg;
        }
        if(index >= 0 && index < this.character.spells.length) {
            let rem = this.character.spells.splice(index, 1);
            this.onSave.emit({type:"shamanSpell",value:rem});
        }
    }

    hasMagik(amount) {
        return this.character.magik.current >= (amount || 0);
    }

    spendMagik(amount) {
        if(this.character.magik.current >= amount) {
            this.character.magik.current -= amount;
            this.onSave.emit({ type:'magik.current', value: this.character.magik.current });
        }
    }

    resetMagik() {
        this.character.magik.current = this.maxMagik;
        this.onSave.emit({ type:'magik.current', value: this.character.magik.current });
    }

    getAvailableSpells () {
        let takenNames = (this.character.spells||[]).map(a=>a.name);
        return this.afs.getShamanSpells().then( (spells:ShamanSpell[]) => {
            return spells.filter( a => {
                //return only those that can be chosen multiple times
                // or haven't already been chosen
                return takenNames.indexOf(a.name)<0;
            });
        });
    }

    openChooser() {
        const ref = this.modalService.createComponentRef(ShamanSpellsChooserComponent);
        ref.instance.options = [];
        ref.instance.onClose = (event) => {
            this.modalService.destroyRef(ref, 0);
            if(event.apply) {
                this.add(event.value as ShamanSpell);
            }
        };
        const element = this.modalService.getDomElementFromComponentRef(ref);
        this.modalService.addChild(element);

        this.getAvailableSpells().then( available => {
            ref.instance.options = available;
        });
    }

    onSpellEvent($event) {
        switch($event.type) {
            case 'deleted': this.remove($event.value); break;
            case 'magikSpent': this.spendMagik($event.value*1); break;
            default: console.log("Unrecognized spell event: " + $event.type);
        }
    }
}












@Component({
  selector: 'shaman-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['./shaman-spells.component.less']
})
export class ShamanSpellComponent implements OnInit {

    @Input() spell : ShamanSpell;
    @Input() magik : number = 0;
    @Output() onEvent : EventEmitter<any> = new EventEmitter<any>();

    public status : string; //one of "success!" or "failed!";
    public roll : number;
    public magikSpent : number = 0;
    public confirmingDelete: boolean = false;

    constructor() { }

    ngOnInit() { }

    ngOnDestroy() {
        this.spell = null;
        this.magik = null;
    }

    remove() {
        this.onEvent.emit({type: 'deleted', value: this.spell});
    }

    castSpell() {
        let power = this.spell.power;
        if(!power) return;  //what do we do here?

        let roll = (Math.random()*6) + (Math.random()*6);
        if(roll >= power) {
            //show success message
            this.status = "Cast successfully!";
        } else {
            //show fail message
            this.status = "Cast failed!";
        }
        //show rolled value
        this.roll = roll;
    }

    hasMagik(amount?: number) {
        return this.magik >= (amount || 0);
    }

    spendMagik() {
        //get value from associated select...
        let amount = this.magikSpent*1;
        if(this.magik > amount) {
            this.onEvent.emit({ type:'magikSpent', value: amount });
            this.magikSpent = 0;
        }
    }
}
