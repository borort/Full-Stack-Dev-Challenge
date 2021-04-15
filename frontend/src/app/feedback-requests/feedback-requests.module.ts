import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRequestsRoutingModule } from './feedback-requests-routing.module';
import { DialogOverviewExampleDialog, FeedbackRequestListComponent } from './feedback-request-list/feedback-request-list.component';
import { FeedbackRequestEditComponent } from './feedback-request-edit/feedback-request-edit.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FeedbackRequestListComponent,
    FeedbackRequestEditComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    CommonModule,
    FeedbackRequestsRoutingModule,
    SharedModule
  ]
})
export class FeedbackRequestsModule { }
