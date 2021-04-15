import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PerformanceReview, PerformanceReviewService } from 'src/app/core/services/performance-review.service';

@Component({
  selector: 'app-performance-review-list',
  templateUrl: './performance-review-list.component.html',
  styleUrls: ['./performance-review-list.component.css']
})
export class PerformanceReviewListComponent implements OnInit {

  constructor(
    private performanceReviewService: PerformanceReviewService,
    private router: Router
  ) { }

  public performance_reviews;

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {

    this.performanceReviewService.getPerformanceReviews().pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<PerformanceReview[]>) => {
        console.log(res.body);
        this.performance_reviews = res.body;
    });

  }

}
