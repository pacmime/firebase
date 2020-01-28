import {
    Component, OnInit, OnChanges, OnDestroy,
    Input, Output, EventEmitter, SimpleChanges
} from '@angular/core';

import { Item, Events } from '../models/character.model';
import { ItemEditorComponent } from './editor/editor.component';
import { SOBError } from "../models/error";


@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./items.component.less']
})
export class ItemComponent implements OnInit, OnChanges, OnDestroy {

    @Input()  item        : Item;
    @Output() onEvent     : EventEmitter<any> = new EventEmitter<any>();

    private confirming    : boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes : SimpleChanges) {

    }

    ngOnDestroy() {
        this.item = null;
        this.confirming = null;
    }

    /**
     *
     */
    editItem () { this.onEvent.emit({type:Events.ITEM_EDIT, item: this.item}); }

    /**
     *
     */
    removeItem() { this.onEvent.emit({type:Events.ITEM_REMOVE,item: this.item}); }

    /**
     *
     */
    equipItem() { this.onEvent.emit({type:Events.ITEM_EQUIP, item:this.item}); }

    /**
     *
     */
    confirmingDelete( value ?: boolean ) : boolean {
        if(typeof(value) !== 'undefined' && value !== null) {
            this.confirming = value;
            return value;
        }
        return this.confirming;
    }

}
