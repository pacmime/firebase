import {
    Component, OnInit, OnDestroy, Input, Output, OnChanges, EventEmitter, Inject
} from '@angular/core';
import {
    trigger, state, style, animate, transition
} from '@angular/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ability } from '../../models/character.model';
import { AbstractDialogComponent } from '../../shared/dialog/dialog.component';


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
export class AbilityChooserComponent extends AbstractDialogComponent<AbilityChooserComponent>
implements OnInit, OnDestroy {

  // @Input() options : {
  //     paths: Ability[];
  //     rolled: Ability[];
  //     rest: Ability[];
  // };
  // @Input() abilities : Ability[];
  // @Input() closable = true;
  // @Input() visible: boolean = true;
  // @Output() onClose: Function;

  private selection : Ability = null;

  public groupToggles : any = {
      paths: false,
      rolled: false,
      rest: false
  };

  constructor(dialogRef: MatDialogRef<AbilityChooserComponent>,
      @Inject(MAT_DIALOG_DATA) data: any
  ) {
      super(dialogRef, data);
  }

  ngOnInit() {
      super.ngOnInit();
  }

  ngOnDestroy() {
      super.ngOnDestroy();
      // this.abilities = null;
      this.selection = null;
      // this.closable = false;
      // this.visible = false;
      // this.onClose = null;
  }

  // close() {
  //     this.visible = false;
  //     this.onClose({apply:false,value:null});
  // }
  //
  // apply() {
  //     this.visible = false;
  //
  //     //move ".value" to ".desc" for chosen abilities
  //     let value : Ability = JSON.parse(JSON.stringify(this.selection));
  //     value.desc = this.selection.value;
  //     delete value.value;
  //
  //     this.onClose({ apply:true, value:value });
  // }

  choose(ability : Ability) {
      if(!ability || ability.disabled) return;
      if(this.isChosen(ability)) this.selection = null;
      else {
          if(ability.desc) this.selection = ability;
          else {
              let value : Ability = JSON.parse(JSON.stringify(ability));
              value.desc = ability.value;
              delete value.value;
              this.selection = value;
          }
      }
  }

  isChosen(ability : Ability) {
      return this.selection && this.selection.name === ability.name;
  }

  hasSelection() {
      return this.selection !== null;
  }

}
