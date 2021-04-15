import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


export interface FeedbackRequest {
  id: number;
  feedback: string;
  rating: number;
  is_submitted: boolean;
  reviewee: [];

}


@Injectable({
  providedIn: 'root'
})
export class FeedbackRequestService {

  private API_URL = environment.apiUrl;
  userId;

  

  constructor(
    private httpClient: HttpClient, 
    public router: Router, 
    private route: ActivatedRoute,
    @Inject('LOCALSTORAGE') private localStorage: Storage
  ) { 
    this.userId  = JSON.parse(this.localStorage.getItem('currentUser'))["id"];
    console.log(JSON.parse(this.localStorage.getItem('currentUser')));

  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  
  public getFeedbackRequests(){
    return this.httpClient.get<FeedbackRequest[]>(`${environment.apiUrl}/users/${this.userId}/feedback-requests`, {observe: "response"})
    .pipe(retry(2), catchError(this.handleError), tap(res => {}));
  }

  public getFeedbackRequestById(id: number){
    return this.httpClient.get<FeedbackRequest[]>(this.API_URL + '/users/'+ this.userId + '/feedback-requests/'+ id)
      .pipe(retry(2), catchError(this.handleError), tap(res => {
        console.log(res);
      }));
  }

  public submitFeedback(id: number, data: FeedbackRequest){
    this.httpClient.patch(this.API_URL + '/users/'+ this.userId + '/feedback-requests/'+ id, data)
      .pipe(retry(2), catchError(this.handleError)).subscribe(res => {
        console.log(res);
      });
  }
  


}
