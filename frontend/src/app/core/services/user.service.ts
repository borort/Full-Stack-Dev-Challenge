import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.apiUrl;

  constructor(
    private httpClient: HttpClient, 
    public router: Router, 
    private route: ActivatedRoute,
    @Inject('LOCALSTORAGE') private localStorage: Storage
  ) { }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }

  
  public getUsers(){
    return this.httpClient.get<User[]>(`${environment.apiUrl}/users`, {observe: "response"})
    .pipe(retry(2), catchError(this.handleError), tap(res => {}));
  }


  public addUser(data: User){
    this.httpClient.post<User[]>(this.API_URL + '/users', data)
      .pipe(retry(2), catchError(this.handleError)).subscribe(res => {
        console.log(res);
      });
  }

  
  public getUserById(id: number){
    return this.httpClient.get<User[]>(this.API_URL + '/users/'+ id)
      .pipe(retry(2), catchError(this.handleError), tap(res => {
        console.log(res);
      }));
  }

 


  public updateUser(id: number, data: User){
    this.httpClient.patch(this.API_URL + '/users/'+ id, data)
      .pipe(retry(2), catchError(this.handleError)).subscribe(res => {
        console.log(res);
      });
  }

  

  public deleteUser(id: number){
    this.httpClient.delete(this.API_URL + '/users/'+ id)
      .pipe(retry(2), catchError(this.handleError)).subscribe(res => {
        console.log(res);
      });
  }

  


  
}
