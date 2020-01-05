
import {
    Component, OnInit, OnDestroy, Input, Output, OnChanges, EventEmitter,
} from '@angular/core';
import {
    trigger, state, style, animate, transition
} from '@angular/animations';
import { SamuraiTactic } from '../../../models/character.model';


@Component({
  selector: 'samurai-tactics-chooser',
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
export class SamuraiTacticsChooserComponent implements OnInit {

  @Input() options : SamuraiTactic[];
  @Input() closable = true;
  @Input() visible: boolean = true;
  @Output() onClose: Function;

  private selection : SamuraiTactic = null;

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

      let value : SamuraiTactic = JSON.parse(JSON.stringify(this.selection));

      this.onClose({ apply:true, value:value });
  }

  choose(value : SamuraiTactic) {
      if(this.isChosen(value)) this.selection = null;
      else this.selection = value;
  }

  isChosen(value : SamuraiTactic) {
      return this.selection && this.selection.name === value.name;
  }

  hasSelection() {
      return this.selection !== null;
  }

}
