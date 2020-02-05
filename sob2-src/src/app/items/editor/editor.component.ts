import {
  Inject, Component, OnInit, OnDestroy,
  Input, Output, OnChanges, EventEmitter,
} from '@angular/core';
import {
    trigger, state, style, animate, transition
} from '@angular/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Item, Modifier } from '../../models/character.model';

import { AbstractDialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'item-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
  animations: [
      trigger('dialog', [
        transition('void => *', [
          style({ transform: 'scale3d(.3, .3, .3)' }),
          animate(100)
        ]),
        transition('* => void', [
          animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
        ])
      ])
  ]
})
export class ItemEditorComponent extends AbstractDialogComponent<ItemEditorComponent>
implements OnInit, OnDestroy {

    private uses : string[];
    private slots : string[];
    private modifierTargets : string[];

    private activeTab = null;
    private tabs: {label:string,id:string}[] = [
        { label:'Basic', id: 'first' },
        { label:'Adv', id: 'second' },
        { label:'Stats', id:'third' },
        { label:'Mods', id:'fourth' }
    ];

    constructor(
        dialogRef: MatDialogRef<ItemEditorComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        super(dialogRef, data);
    }

    ngOnInit() {
        super.ngOnInit();
        this.uses = ['Turn', "Fight", "Adventure", "Travel"];
        this.slots = ['hat', 'face', 'shoulders', 'coat',
            'torso', 'belt',  'pants',  'gloves', 'boots'];
        this.modifierTargets = [
            'Agility', 'Cunning', 'Spirit', 'Strength', 'Lore', 'Luck',
            'init', 'move', 'combat', 'health', 'sanity', 'corruption',
            'grit', 'faith', 'fury', 'magik', 'mana', 'arcanePowder',
            'armor', 'spiritArmor', 'defense'
        ];

        this.activeTab = this.tabs[0];
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.uses = null;
        this.slots = null;
        this.modifierTargets = null;
        this.activeTab = null;
        this.tabs = null;
    }

    canApply() : boolean {
        return !!this.data.item && !!this.data.item.name;
    }


    addModifier () {
        let mod : Modifier = {
            affects: null,
            value: 0
        }
        if(!this.data.item.modifiers)
            this.data.item.modifiers = [];
        this.data.item.modifiers.push(mod);
    }

    removeModifier (index) {
        if(!this.data.item.modifiers || index > this.data.item.modifiers.length)
            return;
        this.data.item.modifiers.splice(index, 1);
    }


}
