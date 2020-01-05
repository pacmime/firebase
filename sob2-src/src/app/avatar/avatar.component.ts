import {
    Component, OnInit, OnDestroy, Input, Output, ElementRef, EventEmitter
} from '@angular/core';
import { Subscription } from "rxjs";

import { SOBCharacter } from '../models/character.model';
import { FirestoreService } from '../firestore.service';


interface FileReaderEventTarget extends EventTarget {
    result:string
}

interface FileReaderEvent extends ProgressEvent {
    target: FileReaderEventTarget;
    getMessage():string;
}



@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.less']
})
export class AvatarComponent implements OnInit {

    public showForm: boolean = false;
    private dirty: boolean = false;
    public imgData: string;
    private character: SOBCharacter;
    private charSubscription: Subscription;

    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();

    constructor(private element: ElementRef, private service : FirestoreService) { }

    ngOnInit() {
        this.charSubscription = this.service.getCharacter( (character:SOBCharacter) => {
            this.character = character;
            this.imgData = character.avatar;
        });
    }

    ngOnDestroy() {
        this.charSubscription.unsubscribe();
        this.charSubscription = null;
        this.showForm = false;
        this.dirty = false;
        this.imgData = null;
        this.character = null;
        this.element = null;
        this.service = null;
    }

    changeListener(event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');

        reader.onload = (e:FileReaderEvent) => {
            var src = e.target.result;
            image.src = this.imgData = src;
            this.dirty = true;
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    isDirty () {
        return this.dirty;
    }

    closeEdit() {
        this.showForm = false;
        this.dirty = false;
    }

    cancel() {
        this.imgData = this.character.avatar;
        this.closeEdit();
    }

    save() {
        // this.character.avatar = this.imgData;
        this.onSave.emit({name: 'avatar', value: this.imgData});
        this.closeEdit();
    }

}
