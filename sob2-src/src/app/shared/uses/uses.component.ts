import {
    Component, OnInit, Input, Output, EventEmitter
} from '@angular/core';

import { Item } from '../../models/character.model';

@Component({
  selector: 'char-uses',
  templateUrl: './uses.component.html',
  styleUrls: ['./uses.component.less']
})
export class UsesComponent implements OnInit {

    @Input()  items  : Item[] = [] as Item[];
    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();
    public showDesc : {[key:string] : boolean} = {};

    constructor() { }

    ngOnInit() {
    }

    use(item : Item) {
        item.used=!item.used;
    }

    reset() {
        this.items.forEach( item => {
            if(item.used) item.used = false;
        });
    }

}
