import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'char-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.less']
})
export class NotesComponent implements OnInit {

    @Input() notes : string;
    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    saveChanges() {
        this.onSave.emit({type:'notes', value:this.notes});
    }

}
