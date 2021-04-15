import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FeedbackRequest, FeedbackRequestService } from 'src/app/core/services/feedback-request.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  animal: string;
  name: string;
}



@Component({
  selector: 'app-feedback-request-list',
  templateUrl: './feedback-request-list.component.html',
  styleUrls: ['./feedback-request-list.component.css']
})
export class FeedbackRequestListComponent implements OnInit {

  animal: string;
  name: string;


  constructor(
    private feedbackRequestService: FeedbackRequestService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  public feedback_requests;
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {

    this.feedbackRequestService.getFeedbackRequests().pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<FeedbackRequest[]>) => {
        console.log(res.body);
        this.feedback_requests = res.body;
    });

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
      console.log(this.animal);
    });
  }


}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    //this.dialogRef.close(this.form.value);
  }

}
