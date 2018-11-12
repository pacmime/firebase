import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { FirestoreService} from './firestore.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: FirestoreService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        if(!this.auth.isAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;


        // return this.auth.user
        // .take(1)
        // .map(user => !!user)
        // .do(loggedIn => {
        //     if (!loggedIn) {
        //         console.log('access denied')
        //         this.router.navigate(['/login']);
        //     }
        // })
    }
}
