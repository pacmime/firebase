import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from "rxjs/Subscription";

import * as firebase from 'firebase/app';

import { FirestoreService } from '../firestore.service';
import { SOBCharacter } from '../models/character.model';
import { SOBError } from '../models/error';


@Component({
  selector: 'char-list',
  templateUrl: './charlist.component.html',
  styleUrls: ['./charlist.component.less']
})
export class CharListComponent implements OnInit {

    user: firebase.User;
    userSubscription: ISubscription;
    chars: Observable<SOBCharacter[]>;

    newCharClass: SOBCharacter = null;
    classes: SOBCharacter[];

    public _deleting : any = {};
    public error : SOBError = null;

    constructor(private service: FirestoreService) { }

    ngOnInit() {
        this.userSubscription = this.service.getUser().subscribe( user => {
            this.user = user;
            if(user) {
                this.chars = this.service.getUserChars(user.uid);
            } else {
                this.chars = null;
                this.error = new SOBError('auth', "You must sign in to see your characters");
            }
        });

        this.service.getClasses().then(classes => {
            this.classes = classes;
        });
    }

    create() {
        let char = JSON.parse(JSON.stringify(this.newCharClass));
        char.class = char.name;
        char.name = "My New " + char.class;
        char.uid = this.user.uid;
        char.mutations = [];
        char.attacks = [];
        delete char.upgrades;
        // console.log(char);

        this.service.createCharacter(char)
        .then( () => {
            //list should update
        })
        .catch(e => {
            this.error = new SOBError('create',
                "Unable to create a new character, because " + e.message);
        });

    }

    markAsDeleting(id, bool) {
        if(bool) this._deleting[id] = true;
        else delete this._deleting[id];
    }

    isDeleting(id) {
        return !!this._deleting[id];
    }

    remove(id) {
        delete this._deleting[id];
        //TODO remove character;
        this.service.removeCharacter(id)
        .then( () => {

        })
        .catch(e => {
            this.error = new SOBError("delete",
                "Unable to delete character, because " + e.message);
        });
    }

    getAvatar(char: SOBCharacter) : any {
        let src : string = 'assets/avatar.png';
        if(char.avatar) {
            src = char.avatar;
        }
        return {
            'background-image': 'url(' + src + ')',
            'background-size': 'auto 100%',
            'background-repeat': 'no-repeat',
            'background-position': '50% 0'
        };
    }
}
