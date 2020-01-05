import {
    Component, OnInit, OnDestroy, Input, Output, OnChanges, EventEmitter,
} from '@angular/core';
import {
    trigger, state, style, animate, transition
} from '@angular/animations';
import { ShamanSpell } from '../../../models/character.model';

@Component({
  selector: 'shaman-spells-chooser',
  templateUrl: './chooser.component.html',
  styleUrls: ['./chooser.component.less'],
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
export class ShamanSpellsChooserComponent implements OnInit {

    @Input() options : ShamanSpell[];
    @Input() closable = true;
    @Input() visible: boolean = true;
    @Output() onClose: Function;

    private selection : ShamanSpell = null;

    constructor() { }

    ngOnInit() { }

    ngOnDestroy() {
        this.options = null;
        this.selection = null;
        this.closable = false;
        this.visible = false;
        this.onClose = null;
    }

    close() {
        this.visible = false;
        this.onClose({apply:false,value:null});
    }

    apply() {
        this.visible = false;

        let value : ShamanSpell = JSON.parse(JSON.stringify(this.selection));

        this.onClose({ apply:true, value:value });
    }

    choose(value : ShamanSpell) {
        if(this.isChosen(value)) this.selection = null;
        else this.selection = value;
    }

    isChosen(value : ShamanSpell) {
        return this.selection && this.selection.name === value.name;
    }

    hasSelection() {
        return this.selection !== null;
    }
}
