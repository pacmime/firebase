import {
    Component, OnInit, OnDestroy, Input, Output, OnChanges, EventEmitter,
} from '@angular/core';
import {
    trigger, state, style, animate, transition
} from '@angular/animations';
import { ElementalMagik } from '../../../models/character.model';

@Component({
  selector: 'elemental-magik-chooser',
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
export class ElementalMagikChooserComponent implements OnInit {

    @Input() options : ElementalMagik[];
    @Input() closable = true;
    @Input() visible: boolean = true;
    @Output() onClose: Function;

    private selection : ElementalMagik = null;

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
        let value : ElementalMagik = JSON.parse(JSON.stringify(this.selection));
        this.onClose({ apply:true, value:value });
    }

    choose(value : ElementalMagik) {
        if(this.isChosen(value)) this.selection = null;
        else this.selection = value;
    }

    isChosen(value : ElementalMagik) {
        return this.selection && this.selection.name === value.name;
    }

    hasSelection() {
        return this.selection !== null;
    }
}
