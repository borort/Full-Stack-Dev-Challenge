import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackRequest, FeedbackRequestService } from 'src/app/core/services/feedback-request.service';

@Component({
  selector: 'app-feedback-request-edit',
  templateUrl: './feedback-request-edit.component.html',
  styleUrls: ['./feedback-request-edit.component.css']
})
export class FeedbackRequestEditComponent implements OnInit {

  feedbackRequestForm = this.formBuilder.group({
    feedback: ['', Validators.required],
    rating: ['', Validators.required],
  });

  feedback_request: FeedbackRequest[] = [];
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private feedbackRequestService: FeedbackRequestService
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    //console.log(this.id);

    this.feedbackRequestService.getFeedbackRequestById(this.id)
      .subscribe(res => { 
          this.feedbackRequestForm.patchValue(res);
      });
    
  }


  getErrorMessage() {
    if (this.feedbackRequestForm.get('feedback').hasError('required')) {
      return 'Field is required';
    }
  }


  onSubmit(): void {

    if (this.feedbackRequestForm.invalid) {
      return;
    }

    this.submitFeedback();
    
  }


  submitFeedback() {
    console.warn('Feedback submitted', this.feedbackRequestForm.value);
    this.feedbackRequestService.submitFeedback(this.id, this.feedbackRequestForm.value);
    this.feedbackRequestForm.reset();
    this.router.navigate(['/feedback-requests']);
  }

}
