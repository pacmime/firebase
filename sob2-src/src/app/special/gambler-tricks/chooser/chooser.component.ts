import {
    Component, OnInit, OnDestroy, Input, Output, OnChanges, EventEmitter, Inject
} from '@angular/core';
import {
    trigger, state, style, animate, transition
} from '@angular/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GamblerTrick } from '../../../models/character.model';
import { AbstractDialogComponent } from '../../../shared/dialog/dialog.component';


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
export class GamblerTricksChooserComponent extends AbstractDialogComponent<GamblerTricksChooserComponent>
implements OnInit, OnDestroy  {

    private selection : GamblerTrick = null;

    constructor(dialogRef: MatDialogRef<GamblerTricksChooserComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        super(dialogRef, data);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.selection = null;
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
