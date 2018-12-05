import {
    Component, OnInit, OnDestroy, OnChanges,
    Input, Output, EventEmitter, SimpleChanges, SimpleChange
} from '@angular/core';
import { Subject } from 'rxjs';

import { Sermon } from '../../../models/character.model';

const enum FLAGS {
    empty        = 1,    //no faith available
    insufficient = 2,    //insufficient faith to cast
    cast         = 4,    //cast
    xp           = 8     //applied xp
};

function applyFlag(sermon, flag) {
    sermon.status |= flag;
    // console.log(sermon.name + ": " + sermon.status);
}
function removeFlag(sermon, flag) {
    sermon.status &= ~flag;
}
function hasFlag(sermon, flag) {
    return sermon.status & flag;
}



@Component({
    selector: 'sermon',
    templateUrl: './sermon.component.html',
    styleUrls: ['./sermon.component.less']
})
export class PreacherSermonComponent implements OnInit {

    @Input() sermon: Sermon;
    @Input() availableFaith: number = 0;
    @Input() eventSubject : Subject<{name:string,value:any}>;
    @Output() onEvent = new EventEmitter<{ name:string, value:any }>();

    private editable: Sermon;

    public isEditing: boolean = false;
    public confirmingDelete : boolean = false;

    constructor() { }

    ngOnInit() {
        this.eventSubject.subscribe(event => {
            this.handleEvent(event);
        });
    }

    ngOnChanges(changes : SimpleChanges) {
        if(changes.availableFaith) {
            let faith = changes.availableFaith.currentValue;
            let cost = isNaN(this.sermon.cost) ? -1 : this.sermon.cost;

            if(faith <= 0) {
                applyFlag(this.sermon, FLAGS.empty);
            } else {
                removeFlag(this.sermon, FLAGS.empty);
            }

            if(cost > 0 && faith < cost) {
                applyFlag(this.sermon, FLAGS.insufficient);
            } else {
                removeFlag(this.sermon, FLAGS.insufficient);
            }
        }
    }


    use () {
        applyFlag(this.sermon, FLAGS.cast);
        if(this.onEvent)
            this.onEvent.emit({name:'faith:spent', value: this.sermon.cost});
    }

    spendExtraFaith () {
        if(this.onEvent)
            this.onEvent.emit({name:'faith:spent', value: 1});
    }

    applyXP () {
        applyFlag(this.sermon, FLAGS.xp);
        if(this.onEvent)
            this.onEvent.emit({name:'xp:gained', value: this.sermon.xp});
    }

    edit () {
        this.editable = JSON.parse(JSON.stringify(this.sermon));
        this.isEditing = true;
    }

    cancelEditing() {
        this.isEditing = false;
        this.editable = null;
    }

    save () {
        Object.assign(this.sermon, this.editable);
        this.isEditing = false;
        this.editable = null;
    }

    remove () {
        if(this.onEvent)
            this.onEvent.emit({name:'sermon:removed', value: this.sermon});
    }

    canCast () {
        return !hasFlag(this.sermon, FLAGS.cast) &&
               !hasFlag(this.sermon, FLAGS.empty) &&
               !hasFlag(this.sermon, FLAGS.insufficient);
    }

    hasCast () {
        return (this.sermon.status & FLAGS.cast);
    }

    canSpendExtraFaith () {
        return hasFlag(this.sermon, FLAGS.cast) && !hasFlag(this.sermon, FLAGS.empty);
    }

    canApplyXP () {
        return hasFlag(this.sermon, FLAGS.cast) && !hasFlag(this.sermon, FLAGS.xp);
    }

    xpApplied () {
        return (this.sermon.status & FLAGS.xp);
    }

    isInsufficient () {
        return hasFlag(this.sermon, FLAGS.empty) ||
            ( hasFlag(this.sermon, FLAGS.insufficient) &&
             !hasFlag(this.sermon, FLAGS.cast) );
    }

    clearFlags() {
        this.sermon.status = 0;
    }

    handleEvent (event) {
        let name = event.name;
        switch(name) {
            case 'sermons:reset': this.clearFlags(); break;
            case 'faith:available':
                let faith = event.value as number;
                if(faith < this.sermon.cost)
                    applyFlag(this.sermon, FLAGS.insufficient);
                else
                    removeFlag(this.sermon, FLAGS.insufficient);
            break;
        }
    }
}
