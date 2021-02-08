import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Part } from './part';
import { SlotEvent } from '../slot/slot.component';

@Component({
  selector: 'ateam-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.less'],
  host:     {
      '[class.has-top]': 'part&&part.connectors.top',
      '[class.has-bottom]': 'part&&part.connectors.bottom',
      '[class.has-left]': 'part&&part.connectors.left',
      '[class.has-right]': 'part&&part.connectors.right'
  }
})
export class PartsComponent implements OnInit {

    @Input() part : Part;
    @Output() onEvent : EventEmitter<Part> = new EventEmitter<Part>();

    public editing : boolean = false;

    constructor( ) { }

    ngOnInit() {
    }

    onSlotEvent(event : SlotEvent ) {
        if(event.type === 'die.added') {
            this.onEvent.emit(this.part);
        }
    }

}
