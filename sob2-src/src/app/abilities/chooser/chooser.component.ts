import {
    Component, OnInit, OnDestroy, Input, Output, OnChanges, EventEmitter,
    trigger, state, style, animate, transition
} from '@angular/core';

import { Ability } from '../../models/character.model';


@Component({
  selector: 'ability-chooser',
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
export class AbilityChooserComponent implements OnInit {

  @Input() options : {
      paths: Ability[];
      rolled: Ability[];
      rest: Ability[];
  };
  @Input() abilities : Ability[];
  @Input() closable = true;
  @Input() visible: boolean = true;
  @Output() onClose: Function;

  private selection : Ability = null;

  public groupToggles : any = {
      paths: false,
      rolled: false,
      rest: false
  };

  constructor() { }

  ngOnInit() { }

  ngOnDestroy() {
      this.abilities = null;
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

      //move ".value" to ".desc" for chosen abilities
      let value : Ability = JSON.parse(JSON.stringify(this.selection));
      value.desc = this.selection.value;
      delete value.value;

      this.onClose({ apply:true, value:value });
  }

  choose(ability : Ability) {
      if(this.isChosen(ability)) this.selection = null;
      else this.selection = ability;
  }

  isChosen(ability : Ability) {
      return this.selection && this.selection.name === ability.name;
  }

  hasSelection() {
      return this.selection !== null;
  }

}
