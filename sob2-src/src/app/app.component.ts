import { Component } from '@angular/core';
import { Subscription } from "rxjs";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

import { FirestoreService } from './firestore.service';
import { SOBCharacter } from './models/character.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

    title = 'Brimstone Chars v2';
    user: firebase.User;

    userSubscription: Subscription;

    constructor(private service: FirestoreService) {

        this.userSubscription = service.user.subscribe( user => {
            this.user = user;
        });
    }

    logout() {
        this.service.logout();
    }

}
