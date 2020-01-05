import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService} from './firestore.service'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AngularFireAuth, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        return this.auth.authState.pipe(
            map(auth => {
                if( auth === null || auth === undefined) {
                  this.router.navigate(['/login']);
                  return false;
                } else {
                  return true;
                }
            })
        );
    }
}
