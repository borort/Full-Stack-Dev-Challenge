import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PerformanceReview, PerformanceReviewService } from 'src/app/core/services/performance-review.service';
//import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { User, UserService } from 'src/app/core/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';


/*
export const MY_FORMATS = {
  parse: {
      dateInput: 'LL'
  },
  display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY'
  }
};
*/




@Component({
  selector: 'app-performance-review-create',
  templateUrl: './performance-review-create.component.html',
  styleUrls: ['./performance-review-create.component.css']
})
export class PerformanceReviewCreateComponent implements OnInit {

  performanceReviewForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    due_date: ['', Validators.required],
    reviewee: ['', Validators.required],
    reviewer: ['', Validators.required],
    
  });


  performance_reviews: PerformanceReview[] = [];
  employees: User[] = [];
  id: number;
  isAddMode: boolean;
  userId;
  formData = {};

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private performanceReviewService: PerformanceReviewService,
    private userService: UserService,
    @Inject('LOCALSTORAGE') private localStorage: Storage
  ) { 

    this.userId  = JSON.parse(this.localStorage.getItem('currentUser'))["id"];
  }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    
    if (!this.isAddMode) {
      this.performanceReviewService.getPerformanceReviewById(this.id)
        .subscribe(res => { 
            this.performanceReviewForm.patchValue(res);
            //this.performanceReviewForm.controls['reviewee'].setValue(res['id']);
        });
    }


    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<User[]>) => {
        console.log(res);
        this.employees = res.body;
    });
    


  }


  getErrorMessage() {
    if (this.performanceReviewForm.get('name').hasError('required')) {
      return 'Field is required';
    }
  }


  onSubmit(): void {

    if (this.performanceReviewForm.invalid) {
      return;
    }

    if (this.isAddMode) {
        this.addPerformanceReview();
    } else {
        this.updatePerformanceReview();
    }
  }



  addPerformanceReview() {
    console.warn('Form submitted', this.performanceReviewForm.value);
    this.formData = this.performanceReviewForm.value;
    this.formData['user_id'] = this.userId;
    console.log(this.formData);
    this.performanceReviewService.addPerformanceReview(this.performanceReviewForm.value);
    this.performanceReviewForm.reset();
    this.router.navigate(['/performance-reviews']);

  }

  

  updatePerformanceReview() {
    console.warn('Performance review updated', this.performanceReviewForm.value);
    this.performanceReviewService.updatePerformanceReview(this.id, this.performanceReviewForm.value);
    this.performanceReviewForm.reset();
    this.router.navigate(['/performance-reviews']);

  }

}
