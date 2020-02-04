import {
    Component, OnInit, Input, Output, EventEmitter
} from '@angular/core';

import { SOBCharacter, Item, Ability } from '../../models/character.model';

@Component({
  selector: 'char-uses',
  templateUrl: './uses.component.html',
  styleUrls: ['./uses.component.less']
})
export class UsesComponent implements OnInit {

    @Input()  character  : SOBCharacter;
    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();
    public showDesc : {[key:string] : boolean} = {};

    constructor() { }

    ngOnInit() {

    }

    use(it : Item|Ability) {
        it.used=!it.used;
    }

    reset( type : string ) {
        let items = this.character.items;
        items.forEach( it => { if(it.used && type == it.usage) it.used = false; });

        let abilities = this.character.abilities;
        abilities.forEach( a => { if(a.used && type == a.usage) a.used = false; });
    }

}
