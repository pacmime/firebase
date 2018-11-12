
import {
    Component, OnInit, OnDestroy, Input, Output, OnChanges, EventEmitter,
    trigger, state, style, animate, transition
} from '@angular/core';

import { Option } from '../../models/character.model';

@Component({
  selector: 'option-chooser',
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
export class ChooserComponent<Option> implements OnInit {

  @Input() options : Option[];
  @Input() closable = true;
  @Input() visible: boolean = true;
  @Output() onClose: Function;

  private selection : Option = null;

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

      let value : Option = JSON.parse(JSON.stringify(this.selection));

      this.onClose({ apply:true, value:value });
  }

  choose(value : Option) {
      if(this.isChosen(value)) this.selection = null;
      else this.selection = value;
  }

  isChosen(value : Option) {
      return this.selection && this.selection['name'] === value['name'];
  }

  hasSelection() {
      return this.selection !== null;
  }

}
