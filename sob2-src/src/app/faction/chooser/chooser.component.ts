import {
    Component, OnInit, OnDestroy, Input, Output, OnChanges, EventEmitter,
    trigger, state, style, animate, transition
} from '@angular/core';

import { Option } from '../../models/character.model';


@Component({
  selector: 'faction-chooser',
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
export class FactionChooserComponent implements OnInit {

  @Input() options : Option[];
  @Input() factions : Option[];
  @Input() closable = true;
  @Input() visible: boolean = true;
  @Output() onClose: Function;

  private selection : Option = null;

  public groupToggles : any = {
      paths: false,
      rolled: false,
      rest: false
  };

  constructor() { }

  ngOnInit() { }

  ngOnDestroy() {
      this.factions = null;
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

      //move ".value" to ".desc" for chosen factions
      let value : Option = JSON.parse(JSON.stringify(this.selection));
      value.desc = this.selection.value;
      delete value.value;

      this.onClose({ apply:true, value:value });
  }

  choose(faction : Option) {
      if(this.isChosen(faction)) this.selection = null;
      else this.selection = faction;
  }

  isChosen(faction : Option) {
      return this.selection && this.selection.name === faction.name;
  }

  hasSelection() {
      return this.selection !== null;
  }

}
