import {
    Component, OnInit, OnDestroy, OnChanges,
    Input, Output, EventEmitter, SimpleChanges, SimpleChange
} from '@angular/core';
import { Subject } from 'rxjs';

import { ElementalMagik } from '../../../models/character.model';

const enum FLAGS {
    empty        = 1,    //no mana available
    insufficient = 2,    //insufficient mana to cast
    cast         = 4,    //cast
    xp           = 8     //applied xp
};

function applyFlag(spell, flag) {
    spell.status |= flag;
    // console.log(spell.name + ": " + spell.status);
}
function removeFlag(spell, flag) {
    spell.status &= ~flag;
}
function hasFlag(spell, flag) {
    return spell.status & flag;
}



@Component({
    selector: 'magik',
    templateUrl: './spell.component.html',
    styleUrls: ['./spell.component.less']
})
export class ElementalMagikSpellComponent implements OnInit {

    @Input() spell: ElementalMagik;
    @Input() availableMana: number = 0;
    @Input() eventSubject : Subject<{name:string,value:any}>;
    @Output() onEvent = new EventEmitter<{ name:string, value:any }>();

    private editable: ElementalMagik;

    public isEditing: boolean = false;
    public confirmingDelete : boolean = false;

    constructor() { }

    ngOnInit() {
        this.eventSubject.subscribe(event => {
            this.handleEvent(event);
        });
    }

    ngOnChanges(changes : SimpleChanges) {
        if(changes.availableMana) {
            let mana = changes.availableMana.currentValue;
            let cost = isNaN(this.spell.cost) ? -1 : this.spell.cost;

            if(mana <= 0) {
                applyFlag(this.spell, FLAGS.empty);
            } else {
                removeFlag(this.spell, FLAGS.empty);
            }

            if(cost > 0 && mana < cost) {
                applyFlag(this.spell, FLAGS.insufficient);
            } else {
                removeFlag(this.spell, FLAGS.insufficient);
            }
        }
    }


    use () {
        applyFlag(this.spell, FLAGS.cast);
        if(this.onEvent)
            this.onEvent.emit({name:'mana:spent', value: this.spell.cost});
    }

    spendExtraMana () {
        if(this.onEvent)
            this.onEvent.emit({name:'mana:spent', value: 1});
    }

    applyXP () {
        applyFlag(this.spell, FLAGS.xp);
        if(this.onEvent)
            this.onEvent.emit({name:'xp:gained', value: this.spell.xp});
    }

    edit () {
        this.editable = JSON.parse(JSON.stringify(this.spell));
        this.isEditing = true;
    }

    cancelEditing() {
        this.isEditing = false;
        this.editable = null;
    }

    save () {
        Object.assign(this.spell, this.editable);
        this.isEditing = false;
        this.editable = null;
    }

    remove () {
        if(this.onEvent)
            this.onEvent.emit({name:'spell:removed', value: this.spell});
    }

    canCast () {
        return !hasFlag(this.spell, FLAGS.cast) &&
               !hasFlag(this.spell, FLAGS.empty) &&
               !hasFlag(this.spell, FLAGS.insufficient);
    }

    hasCast () {
        return (this.spell.status & FLAGS.cast);
    }

    canSpendExtraMana () {
        return hasFlag(this.spell, FLAGS.cast) && !hasFlag(this.spell, FLAGS.empty);
    }

    canApplyXP () {
        return hasFlag(this.spell, FLAGS.cast) && !hasFlag(this.spell, FLAGS.xp);
    }

    xpApplied () {
        return (this.spell.status & FLAGS.xp);
    }

    isInsufficient () {
        return hasFlag(this.spell, FLAGS.empty) ||
            ( hasFlag(this.spell, FLAGS.insufficient) &&
             !hasFlag(this.spell, FLAGS.cast) );
    }

    clearFlags() {
        this.spell.status = 0;
    }

    handleEvent (event) {
        let name = event.name;
        switch(name) {
            case 'elementalMagik:reset': this.clearFlags(); break;
            case 'mana:available':
                let mana = event.value as number;
                if(mana < this.spell.cost)
                    applyFlag(this.spell, FLAGS.insufficient);
                else
                    removeFlag(this.spell, FLAGS.insufficient);
            break;
        }
    }
}
