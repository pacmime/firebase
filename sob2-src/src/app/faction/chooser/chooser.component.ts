import {
    Component, OnInit, OnDestroy, Input, Output, OnChanges, EventEmitter, Inject
} from '@angular/core';
import {
    trigger, state, style, animate, transition
} from '@angular/animations';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Option } from '../../models/character.model';
import { AbstractDialogComponent } from '../../shared/dialog/dialog.component';


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
export class FactionChooserComponent extends AbstractDialogComponent<FactionChooserComponent>
implements OnInit, OnDestroy  {

    private selection : Option = null;
    public groupToggles : any = {
        paths: false,
        rolled: false,
        rest: false
    };

    constructor(dialogRef: MatDialogRef<FactionChooserComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        super(dialogRef, data);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        // this.factions = null;
        // this.options = null;
        this.selection = null;
        // this.closable = false;
        // this.visible = false;
        // this.onClose = null;
  }
  //
  // close() {
  //     this.visible = false;
  //     this.onClose({apply:false,value:null});
  // }
  //
  // apply() {
  //     this.visible = false;
  //
  //     //move ".value" to ".desc" for chosen factions
  //     let value : Option = JSON.parse(JSON.stringify(this.selection));
  //     value.desc = this.selection.value;
  //     delete value.value;
  //
  //     this.onClose({ apply:true, value:value });
  // }

  choose(faction : Option) {
      if(this.isChosen(faction)) this.selection = null;
      else {
          if(faction.desc) this.selection = faction;
          else {
              let value : Option = JSON.parse(JSON.stringify(faction));
              value.desc = faction.value;
              delete value.value;
              this.selection = value;
          }
      }
  }

  isChosen(faction : Option) {
      return this.selection && this.selection.name === faction.name;
  }

  hasSelection() {
      return this.selection !== null;
  }

}
