import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    public email: string;
    public password: string;
    public message: string;

    constructor(private router: Router,
                private service: FirestoreService) {
    }

    ngOnInit() {
        this.service.getAuth().subscribe( user => {
            if (user !== null) {
                this.message = `Welcome ${user.email}!`;
                setTimeout(() => {
                    this.router.navigate(['/chars']);
                }, 1000);
            }
        });
    }

    login() {
        if(!this.email || !this.password) {
            this.message = "Specify your email address and password";
            return;
        }
        this.service.login(this.email, this.password).then( user => {
            this.router.navigate(['/chars']);
        });
    }

    resetPassword() {
        if(!this.email) {
            this.message = "Specify your email address to reset your password";
            return;
        }
        this.service.resetPassword(this.email)
        .then( () => {
            this.message = "Password reset email sent";
        })
        .catch(e => {
            this.message = "There was an error resetting your password: " + e.message;
        });
    }
}
