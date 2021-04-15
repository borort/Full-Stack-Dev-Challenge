import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { EMPTY, of } from 'rxjs';
//import 'rxjs/add/operator/delay';
import { delay } from "rxjs/operators";

import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading: boolean;

    constructor(private router: Router,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.logout();
        this.createForm();
    }

    private createForm() {
        const savedUserEmail = localStorage.getItem('savedUserEmail');

        this.loginForm = new FormGroup({
            email: new FormControl(savedUserEmail, [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            
        });
    }

    login() {
        const email = this.loginForm.get('email').value;
        const password = this.loginForm.get('password').value;
        
        this.loading = true;
        this.authService
            .login(email.toLowerCase(), password)
            .subscribe(
                data => {
                    localStorage.setItem('savedUserEmail', email);
                    this.router.navigate(['/']);
                    
                },
                error => {
                    console.log(error);
                    this.loading = false;
                }
            );
    }

    
}
