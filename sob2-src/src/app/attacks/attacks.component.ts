import {
    Component, OnInit, OnDestroy, Input, Output, EventEmitter
} from '@angular/core';

import { Attack, AttackType } from '../models/character.model';
import { SOBError } from "../models/error";

@Component({
  selector: 'attacks',
  templateUrl: './attacks.component.html',
  styleUrls: ['./attacks.component.less']
})
export class AttacksComponent implements OnInit {

    @Input() attacks: Attack[] = [];
    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();
    @Output() onError : EventEmitter<any> = new EventEmitter<any>();

    public confirmingDelete : any = {};
    public rollResults: any[] = [];

    // public bearFormAttack: Attack = {
    //     attack  : '0';
    //     damage  : '0';
    //     description : '+2 Strength, +1 Combat, Armor 5+, Use 1 Grit to add D3 + Hero level to one Combat Hit, When you kill an Enemy recover Grit on D6 of 5 or 6',
    //     name : "Bear Form Attack",
    //     toHit : 0,
    //     type : 'melee' as AttackType
    //
    // }


    constructor() { }

    ngOnInit() {
        this.confirmingDelete = {};
    }

    ngOnDestroy () {
        this.attacks = null;
        this.confirmingDelete = null;
        this.rollResults = null;
    }

    add () {
        let att = {
            name: "New Attack",
            description: "Describe this attack",
            toHit: "3",
            attack: "1D6",
            damage: "1D6",
            type: "melee" as AttackType
        };
        this.attacks.push(att);
        this.onSave.emit({type:"attack", value: att});
    }

    remove(index) {
        if(index >= 0) {
            let rem = this.attacks.splice(index, 1);
            this.onSave.emit({type:"attack", value:rem});
        }
    }

    onEvent( event: { name:string, value:any } ) {

        switch(event.name) {
        case 'remove':
            let index = this.attacks.indexOf(event.value);
            this.remove(index);
            break;
        case 'update':
            this.onSave.emit({type:"attack", value: event.value});
        	break;
        default:
            console.log( "Unsupported event: " + event.name );
        }
    }


}
