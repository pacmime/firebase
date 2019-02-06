import {
    Component, OnInit, Input, Output, EventEmitter
} from '@angular/core';

import { Modifier } from '../../models/character.model';

@Component({
  selector: 'temporary-modifiers',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.less']
})
export class TempComponent implements OnInit {

    @Input() mods : Modifier[] = [] as Modifier[];
    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();

    public newModifier : Modifier = { affects: null, value: 0 };
    public modifierTargets : string[] = [
        'Agility', 'Cunning', 'Spirit', 'Strength', 'Lore', 'Luck',
        'init', 'move', 'combat', 'health', 'sanity', 'corruption',
        'grit', 'faith', 'fury', 'magik', 'armor', 'spiritArmor', 'defense'
    ];

    constructor() { }

    ngOnInit() {
    }

    addModifier() {
        this.mods.push(Object.assign({}, this.newModifier));
        this.onSave.emit({ value: this.mods });

        //reset new modifier value
        this.newModifier.affects = null;
        this.newModifier.value = 0;
    }

    removeModifier(index) {
        this.mods.splice(index, 1);
        this.onSave.emit({ value: this.mods });
    }

}
