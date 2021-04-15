import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  userFirstName: string;
  userLastName: string;
  isAdmin: boolean;
  user;

  constructor(
    private authService: AuthService,
    private authGuard: AuthGuard,
    @Inject('LOCALSTORAGE') private localStorage: Storage,
    public router: Router,
    private http: HttpClient,

  ) { }

  ngOnInit(): void {

    //const user = this.authService.getCurrentUser();
    //const user = JSON.parse(this.localStorage.getItem('currentUser'));

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    });
    //console.log(localStorage.getItem('access_token'));
    this.http.get(`${environment.apiUrl}/user`, {headers}).subscribe(
      result => {
        this.user = result,
        //console.log(this.user)
        this.isAdmin = this.user['is_admin'];
        this.userFirstName = this.user['first_name'];
        this.userLastName = this.user['last_name'];

        this.localStorage.setItem('currentUser', JSON.stringify({
          id: result['id'],
          first_name: result['first_name'],
          last_name: result['last_name'],
          email: result['email']
        }));
      }
    );

    //this.user = JSON.parse(this.user);
    //console.log(this.user);
    //this.isAdmin = this.user['is_admin'];
    //this.userFirstName = this.user['first_name'];
    //this.userLastName = this.user['last_name'];

  }

  logout(): void {
    this.authService.logout();
  }

}
