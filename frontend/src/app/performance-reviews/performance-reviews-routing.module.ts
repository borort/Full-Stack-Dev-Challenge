import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { PerformanceReviewCreateComponent } from './performance-review-create/performance-review-create.component';
import { PerformanceReviewListComponent } from './performance-review-list/performance-review-list.component';

const routes: Routes = [

  { 
    path: '', component: LayoutComponent ,
    children: [
      { path: '', component: PerformanceReviewListComponent },
      { path: 'create', component: PerformanceReviewCreateComponent },
      { path: 'edit/:id', component: PerformanceReviewCreateComponent },
    ]
    
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceReviewsRoutingModule { }
