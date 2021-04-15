import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { PerformanceReviewListComponent } from './performance-reviews/performance-review-list/performance-review-list.component';
import { PerformanceReviewCreateComponent } from './performance-reviews/performance-review-create/performance-review-create.component';
import { PerformanceReviewEditComponent } from './performance-reviews/performance-review-edit/performance-review-edit.component';
import { FeedbackRequestListComponent } from './feedback-requests/feedback-request-list/feedback-request-list.component';
import { FeedbackRequestEditComponent } from './feedback-requests/feedback-request-edit/feedback-request-edit.component';

import { CoreModule } from './core/core.module';

import { LayoutComponent } from './shared/layout/layout.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    //DashboardComponent,
    //LoginComponent,
    /*
    EmployeeListComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    PerformanceReviewListComponent,
    PerformanceReviewCreateComponent,
    PerformanceReviewEditComponent,
    FeedbackRequestListComponent,
    FeedbackRequestEditComponent,
    */
    //LayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    //FormsModule,
    //ReactiveFormsModule,
    CoreModule,
    DashboardModule,
    AuthModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
