import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
//import * as jwt_decode from 'jwt-decode';
//import * as moment from 'moment';
//import 'rxjs/add/operator/delay';


import { environment } from '../../../environments/environment';
import { of, EMPTY, Observable, throwError } from 'rxjs';
import { delay } from "rxjs/operators";
import { Router } from '@angular/router';

/*
export class User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
}
*/


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject('LOCALSTORAGE') private localStorage: Storage
    ) {
    }


    handleError(error: HttpErrorResponse) {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      //window.alert(errorMessage);
      return throwError(errorMessage);
    }



    login(email: string, password: string) {

      return this.http.post(`${environment.apiUrl}/auth/login`, { email, password })
        .pipe(map((res:any) => {
            // store access token in local storage to keep user logged in
            localStorage.setItem('access_token', res['token']);
            console.log(res);
            //this.getUser(res['token']);
            return true;
        }), catchError(this.handleError)
        );

    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.localStorage.removeItem('currentUser');
        this.localStorage.removeItem('access_token');
        this.router.navigate(['auth/login']);
        
    }


    getUser(access_token): any {
      const headers = new HttpHeaders({
        //Authorization: `Bearer ${localStorage.getItem('access_token')}`
        Authorization: `Bearer ${access_token}`
      });
      //console.log(access_token);
      this.http.get(`${environment.apiUrl}/user`, {headers}).subscribe(
        result => {
          console.log(result),
          this.localStorage.setItem('currentUser', JSON.stringify({
            id: result['id'],
            first_name: result['first_name'],
            last_name: result['last_name'],
            email: result['email'],
            is_admin: result['is_admin']
          }));
          //return true;
        }
        
      );
    }


    getCurrentUser(): any {
      return JSON.parse(this.localStorage.getItem('currentUser'));
    }

    isAuthenticated(): boolean {
      const token = localStorage.getItem('access_token');
      // Check whether the token is expired and return
      // true or false
      if(!token) {
        return false;
      }
      return true;
      //return !this.jwtHelper.isTokenExpired(token);
    }

    
}
