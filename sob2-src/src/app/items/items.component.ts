import {
    Component, OnInit, OnDestroy, Input, Output, EventEmitter
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { Item } from '../models/character.model';
import { ItemEditorComponent } from './editor/editor.component';
import { SOBError } from "../models/error";

@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less']
})
export class ItemsComponent implements OnInit {

    @Input() items: Item[];
    @Input() weightLimit : number = 0;
    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();
    @Output() onError : EventEmitter<any> = new EventEmitter<any>();

    public  dialog    : MatDialog;
    public totalWeight : number;
    public totalDarkstone : number;
    private confirming : { key: number, value: boolean } = {} as { key: number, value: boolean };
    private subscription : Subscription;

    constructor( dialog ?: MatDialog ) {
        if(dialog) this.dialog = dialog;
    }

    ngOnInit() {
        this.updateTotals();
    }

    ngOnDestroy() {
        this.items = null;
        this.totalWeight = null;
        this.totalDarkstone = null;
        // this.modalService = null;
    }

    updateTotals() {
        let weight = 0;
        let stone = 0;

        this.items.forEach( item => {
            weight += item.weight ? item.weight : 0;
            stone += item.darkstone ? item.darkstone : 0;
        });

        this.totalWeight = weight;
        this.totalDarkstone = stone;
    }

    addItem () {

        let item : Item = {
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
        this.openEditor(item, null);
    }

    editItem (index) {
        let item = this.items[index];
        let editable = JSON.parse(JSON.stringify(item));
        this.openEditor(editable, index);
    }


    openEditor(item : any , position : number) {
        let opts = {
            data: {
                item : item
            }
        };
        const dialogRef = this.dialog.open(ItemEditorComponent, opts);
        this.subscription = dialogRef.afterClosed().subscribe( ( result : Item ) => {

            if(result) {
                let type = '';
                if(isNaN(position)) {
                    type = "item.added";
                    this.items.push(result);

                } else {
                    this.items[position] = result;
                    type = "item.updated";
                }
                this.updateTotals();
                this.onSave.emit({ type:type, value:result });
            }

            this.subscription.unsubscribe();
            this.subscription = null;
        });
    }


    removeItem(index) {
        delete this.confirming[index];
        let rem = this.items.splice(index, 1);
        this.onSave.emit({type:"item.removed",value:rem});
    }

    equipItem(item) {
        //if equipping the item, unequip anything already in that slot
        if(!item.equipped) this.unEquipItemAtSlot(item.slot);
        item.equipped=!item.equipped;
        this.onSave.emit({type:"item.equipped", value:item});
    }

    unEquipItemAtSlot(slot) {
        if(!slot) return;
        let item = this.items.find( it => it.slot === slot );
        if(item && item.equipped)
            item.equipped = false;
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
