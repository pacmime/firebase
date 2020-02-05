import {
    Component, OnInit, OnChanges, OnDestroy,
    Input, Output, EventEmitter, SimpleChanges
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { Item, Events } from '../models/character.model';
import { ItemEditorComponent } from './editor/editor.component';
import { SOBError } from "../models/error";


@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less']
})
export class ItemsComponent implements OnInit, OnChanges, OnDestroy {

    @Input()  items       : Item[];
    @Input()  weightLimit : number = 0;
    @Output() onSave      : EventEmitter<any> = new EventEmitter<any>();
    @Output() onError     : EventEmitter<any> = new EventEmitter<any>();

    public  dialog        : MatDialog;
    public totalWeight    : number;
    public totalDarkstone : number;
    private subscription  : Subscription;

    constructor( dialog ?: MatDialog ) {
        if(dialog) this.dialog = dialog;
    }

    ngOnInit() {
        this.updateTotals();
    }

    ngOnChanges(changes : SimpleChanges) {
        if(changes.items) {
            this.updateTotals();
        }
    }

    ngOnDestroy() {
        this.items = null;
        this.totalWeight = null;
        this.totalDarkstone = null;
    }

    /**
     *
     */
    onItemEvent( event : any, index : number ) {
        let type = event.type;
        let item = event.item;
        switch(type) {
            case Events.ITEM_EDIT   : this.editItem(index); break;
            case Events.ITEM_REMOVE : this.removeItem(index); break;
            case Events.ITEM_EQUIP  : this.equipItem(item); break;
            default: console.log("unrecognized item event " + type);
        }
    }

    /**
     *
     */
    updateTotals() {
        let weight = 0;
        let stone = 0;
        this.items.forEach( item => {
            weight += isNaN(item.weight) ? 0 : (item.weight*1);
            stone  += isNaN(item.darkstone) ? 0 : (item.darkstone*1);
        });
        this.totalWeight = weight;
        this.totalDarkstone = stone;
    }

    /**
     *
     */
    addItem () {
        let item : Item = this.createBlankItem();
        this.openEditor(item, -1);
    }

    /**
     *
     */
    editItem (index) {
        let item = this.items[index];
        let editable = JSON.parse(JSON.stringify(item));
        this.openEditor(editable, index);
    }

    /**
     *
     */
    openEditor(item : any , position : number) {
        let opts = { data: { item : item } };
        const dialogRef = this.dialog.open(ItemEditorComponent, opts);
        this.subscription = dialogRef.afterClosed().subscribe( ( result : Item ) => {

            if(result) {
                let type = '';

                if(!isNaN(position) && position !== null && position >= 0) {
                    type = Events.ITEM_UPDATE; //"item.updated";
                    this.items[position] = result;

                } else {
                    this.items.push(result);
                    type = Events.ITEM_ADD;//"item.added";
                }
                this.updateTotals();
                this.onSave.emit({ type:type, value:result });
            }

            this.subscription.unsubscribe();
            this.subscription = null;
        });
    }

    /**
     *
     */
    removeItem(index) {
        let rem = this.items.splice(index, 1);
        this.updateTotals();
        this.onSave.emit({
            type: Events.ITEM_REMOVE, //"item.removed",
            value:rem
        });
    }

    /**
     *
     */
    equipItem(item) {
        //if equipping the item, unequip anything already in that slot
        if(!item.equipped) this.unEquipItemAtSlot(item.slot);
        item.equipped=!item.equipped;
        this.onSave.emit({
            type: Events.ITEM_EQUIP, //"item.equipped",
            value:item
        });
    }

    /**
     *
     */
    unEquipItemAtSlot(slot) {
        if(!slot) return;
        let item = this.items.find( it => it.slot === slot );
        if(item && item.equipped)
            item.equipped = false;
    }

    /**
     *
     */
    createBlankItem() : Item {
        return {
            name:       "",
            source:     "General Store",
            slot:       null,
            description: "",
            keywords:   "",
            usage:      null,
            modifiers:  [],
            cost:       0,
            weight:     0,
            darkstone:  0,
            hands:      0,
            slots:      0,
            equipped:   false
        };
    }

}
