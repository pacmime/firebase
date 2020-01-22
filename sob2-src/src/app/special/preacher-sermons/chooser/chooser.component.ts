import {
    Component, OnInit, OnDestroy,
    Input, Output, OnChanges, EventEmitter, Inject
} from '@angular/core';
import {
    trigger, state, style, animate, transition
} from '@angular/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sermon } from '../../../models/character.model';
import { AbstractDialogComponent } from '../../../shared/dialog/dialog.component';

@Component({
  selector: 'preacher-spells-chooser',
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
export class SermonsChooserComponent extends AbstractDialogComponent<SermonsChooserComponent>
implements OnInit, OnDestroy {

    public options : Sermon[] = [];
    private selection : Sermon = null;

    constructor(dialogRef: MatDialogRef<SermonsChooserComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        super(dialogRef, data);
    }

    ngOnInit() {
        super.ngOnInit();
        if(this.data && this.data.options) {
            this.options = this.data.options;
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.options = null;
        this.selection = null;
        this.data = null;
    }

    choose(value : Sermon) {
        if(this.isChosen(value)) this.selection = null;
        else this.selection = value;
    }

    isChosen(value : Sermon) {
        return this.selection && this.selection.name === value.name;
    }

    hasSelection() {
        return this.selection !== null;
    }
}
