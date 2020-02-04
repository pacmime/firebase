import {
    Component, OnInit, OnDestroy, Input, Output, EventEmitter
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from "rxjs";

import { FirestoreService } from '../../firestore.service';
import { Ability, Modifier } from "../../models/character.model";
import { SOBError } from "../../models/error";

@Component({
  selector: 'ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.less']
})
export class AbilityComponent implements OnInit {

    @Input() ability: Ability;
    @Input() index : number = -1;
    @Output() onEvent : EventEmitter<any> = new EventEmitter<any>();

    public editable : Ability = null;
    private confirming : boolean = false;
    private editing    : boolean = false;

    constructor() {
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.confirming = false;
        this.editing = false;
    }

    remove() {
        this.confirming = false;
        this.onEvent.emit({type: 'ability.remove', index: this.index, value: this.ability });
    }

    edit() {
        this.editable = JSON.parse(JSON.stringify(this.ability));
        this.editing = true;
    }
    save() {
        this.editing = false;
        this.onEvent.emit({type: 'ability.update', index: this.index, value: this.editable });
    }

}
