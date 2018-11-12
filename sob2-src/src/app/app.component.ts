import { Component } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
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

    userSubscription: ISubscription;

    constructor(private service: FirestoreService) {

        this.userSubscription = service.user.subscribe( user => {
            this.user = user;
        });
    }

    logout() {
        this.service.logout();
    }

}
