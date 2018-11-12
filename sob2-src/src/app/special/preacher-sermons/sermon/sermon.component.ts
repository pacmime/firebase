import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Sermon } from '../../../models/character.model';

const enum FLAGS {
    empty        = 1,    //no faith available
    insufficient = 2,    //insufficient faith to cast
    cast         = 4,    //cast
    xp           = 8    //applied xp
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
function clearFlags(sermon) {
    sermon.status = 0;
}


@Component({
    selector: 'sermon',
    templateUrl: './sermon.component.html',
    styleUrls: ['./sermon.component.less']
})
export class PreacherSermonComponent implements OnInit {

    @Input() sermon: Sermon;
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

    use () {
        // $emit('sermon:cast', this.sermon.name, this.sermon.cost);

        applyFlag(this.sermon, FLAGS.cast);
        if(this.onEvent)
            this.onEvent.emit({name:'faith:spent', value: this.sermon.cost});
    }

    spendExtraFaith () {
        // $emit('sermon:cast', this.sermon.name, 1);

        if(this.onEvent)
            this.onEvent.emit({name:'faith:spent', value: 1});
    }

    applyXP () {
        // $emit('sermon:xp', this.sermon.name, this.sermon.xp);

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
        //this.onSave();
    }

    remove () {
        //notify
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

    handleEvent (event) {
        let name = event.name;
        switch(name) {
            case 'reset':
                clearFlags(this.sermon);
            break;
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
