import {
    Component, OnInit, OnDestroy, Input, Output, OnChanges, EventEmitter,
    trigger, state, style, animate, transition
} from '@angular/core';

import { GamblerTrick } from '../../../models/character.model';

@Component({
  selector: 'gambler-tricks-chooser',
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
export class GamblerTricksChooserComponent implements OnInit {

    @Input() options : GamblerTrick[];
    @Input() closable = true;
    @Input() visible: boolean = true;
    @Output() onClose: Function;

    private selection : GamblerTrick = null;

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

        let value : GamblerTrick = JSON.parse(JSON.stringify(this.selection));

        this.onClose({ apply:true, value:value });
    }

    choose(value : GamblerTrick) {
        if(this.isChosen(value)) this.selection = null;
        else this.selection = value;
    }

    isChosen(value : GamblerTrick) {
        return this.selection && this.selection.name === value.name;
    }

    hasSelection() {
        return this.selection !== null;
    }
}
