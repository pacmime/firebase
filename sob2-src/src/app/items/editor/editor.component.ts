import {
  Component, OnInit, OnDestroy, Input, Output, OnChanges, EventEmitter,
  trigger, state, style, animate, transition
} from '@angular/core';

import { Item, Modifier } from '../../models/character.model';

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
export class ItemEditorComponent implements OnInit {

    @Input() item : Item;
    @Input() closable = true;
    @Input() visible: boolean = true;
    @Output() onClose: Function;

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

    constructor() { }

    ngOnInit() {
        this.uses = ['Turn', "Fight", "Adventure"];
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
        this.item = null;
        this.closable = false;
        this.visible = false;
        this.onClose = null;
        this.uses = null;
        this.slots = null;
        this.modifierTargets = null;
        this.activeTab = null;
        this.tabs = null;
    }

    canApply() : boolean {
        return !!this.item && !!this.item.name;
    }

    close() {
        this.visible = false;
        this.onClose({apply:false,value:this.item});
    }

    apply() {
        if(!this.canApply()) return;
        this.visible = false;
        this.onClose({apply:true,value:this.item});
    }

    addModifier () {
        let mod : Modifier = {
            affects: null,
            value: 0
        }
        if(!this.item.modifiers)
            this.item.modifiers = [];
        this.item.modifiers.push(mod);
    }

    removeModifier (index) {
        this.item.modifiers.splice(index, 1);
    }

    activateTab (tab) {
        this.activeTab = tab;
    }

}
