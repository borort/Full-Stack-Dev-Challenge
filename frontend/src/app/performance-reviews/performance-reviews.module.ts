import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformanceReviewsRoutingModule } from './performance-reviews-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PerformanceReviewListComponent } from './performance-review-list/performance-review-list.component';
import { PerformanceReviewCreateComponent } from './performance-review-create/performance-review-create.component';
//import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    PerformanceReviewListComponent,
    PerformanceReviewCreateComponent
  ],
  imports: [
    CommonModule,
    PerformanceReviewsRoutingModule,
    SharedModule
  ],
  providers: [
    //{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    //{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }

  ]
})
export class PerformanceReviewsModule { }
