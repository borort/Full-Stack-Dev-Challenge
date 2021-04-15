import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


export interface PerformanceReview {
  id: number;
  name: string;
  description: string;
  due_date: string;

}


@Injectable({
  providedIn: 'root'
})
export class PerformanceReviewService {

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
    return throwError(errorMessage);
  }

  
  public getPerformanceReviews(){
    return this.httpClient.get<PerformanceReview[]>(this.API_URL + '/reviews', {observe: "response"})
    .pipe(retry(2), catchError(this.handleError), tap(res => {}));
  }


  public getPerformanceReviewById(id: number){
    return this.httpClient.get<PerformanceReview[]>(this.API_URL + '/reviews/' + id)
    .pipe(retry(2), catchError(this.handleError), tap(res => {
      console.log(res);
    }));
  }

  
  public addPerformanceReview(data: PerformanceReview){
    return this.httpClient.post<PerformanceReview[]>(this.API_URL + '/reviews', data)
    .pipe(retry(2), catchError(this.handleError)).subscribe(res => {
      console.log(res);
    });
  }


  public updatePerformanceReview(id: number, data: PerformanceReview){
    this.httpClient.patch(this.API_URL + '/reviews/'+ id, data)
      .pipe(retry(2), catchError(this.handleError)).subscribe(res => {
        console.log(res);
      });
  }


}
