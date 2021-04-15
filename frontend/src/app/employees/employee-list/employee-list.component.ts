import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User, UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit , AfterViewInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  private EMPLOYEE_DATA: User[] = [];

  dataSource = new MatTableDataSource(this.EMPLOYEE_DATA);
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'position', 'action'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {

    this.userService.getUsers().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<User[]>) => {
      console.log(res.body);
      this.dataSource.data = res.body;
    });

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  }

  
  deleteUser(id, user) {
    //alert(user.id);
    if(confirm("Are you sure you want to delete employee: "+ `${user.first_name} ${user.last_name}` +"?")) {
      console.log(this.dataSource.data.indexOf(user));
      this.userService.deleteUser(user.id);
      this.dataSource.data.splice(this.dataSource.data.indexOf(user), 1);
      //this.router.navigate(['/categories']);
      this.dataSource._updateChangeSubscription(); 
    }
  }


}
