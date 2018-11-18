import {
    Component, OnInit, OnDestroy, Input, Output, EventEmitter
} from '@angular/core';

import { Item } from '../models/character.model';
import { ModalService } from'../modal.service';
import { ItemEditorComponent } from './editor/editor.component';
import { SOBError } from "../models/error";

@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less']
})
export class ItemsComponent implements OnInit {

    @Input() items: Item[];
    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();
    @Output() onError : EventEmitter<any> = new EventEmitter<any>();

    public totalWeight : number;
    public totalDarkstone : number;
    private confirming : { key: number, value: boolean } = {} as { key: number, value: boolean };

    constructor(private modalService : ModalService) { }

    ngOnInit() {
        this.updateTotals();
    }

    ngOnDestroy() {
        this.items = null;
        this.totalWeight = null;
        this.totalDarkstone = null;
        this.modalService = null;
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

        const ref = this.modalService.createComponentRef(ItemEditorComponent);
        ref.instance.item = item;
        ref.instance.onClose = (event) => {
            this.modalService.destroyRef(ref, 0);
            if(event.apply) {
                this.items.push(event.value as Item);
                this.updateTotals();
                this.onSave.emit({type:"item.added",value:event.value});
            }
        };

        const element = this.modalService.getDomElementFromComponentRef(ref);
        this.modalService.addChild(element);
    }

    editItem (index) {

        let item = this.items[index];
        let editable = JSON.parse(JSON.stringify(item));

        const ref = this.modalService.createComponentRef(ItemEditorComponent);
        ref.instance.item = editable;
        ref.instance.onClose = (event) => {
            this.modalService.destroyRef(ref, 0);
            if(event.apply) {
                this.items[index] = event.value as Item;
                this.updateTotals();
                this.onSave.emit({type:"item.updated",value:event.value});
            }
        };

        const element = this.modalService.getDomElementFromComponentRef(ref);
        this.modalService.addChild(element);
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
