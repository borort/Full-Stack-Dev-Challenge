import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { FeedbackRequestEditComponent } from './feedback-request-edit/feedback-request-edit.component';
import { FeedbackRequestListComponent } from './feedback-request-list/feedback-request-list.component';

const routes: Routes = [
  { 
    path: '', component: LayoutComponent ,
    children: [
      { path: '', component: FeedbackRequestListComponent },
      //{ path: 'create', component: FeedbackRequestEditComponent },
      { path: 'edit/:id', component: FeedbackRequestEditComponent },
    ]
    
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRequestsRoutingModule { }
