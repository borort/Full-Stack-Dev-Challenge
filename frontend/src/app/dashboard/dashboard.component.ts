import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User, UserService } from '../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {

    //this.userService.getUsers().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<User[]>) => {
    //  console.log(res.body);
      //this.dataSource.data = res.body;
    //});


  }

}
