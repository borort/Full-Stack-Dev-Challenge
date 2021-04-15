import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User, UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  employeeForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    position: '',
    password: ['', Validators.required]
  });


  employees: User[] = [];
  id: number;
  isAddMode: boolean;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    
    if (!this.isAddMode) {
      this.userService.getUserById(this.id)
        .subscribe(res => { 
            this.employeeForm.patchValue(res);
        });
    }
    


  }


  getErrorMessage() {
    if (this.employeeForm.get('first_name').hasError('required')) {
      return 'Field is required';
    }
  }


  onSubmit(): void {

    if (this.employeeForm.invalid) {
      return;
    }

    if (this.isAddMode) {
        this.addEmployee();
    } else {
        this.updateEmployee();
    }
  }



  addEmployee() {
    console.warn('Form submitted', this.employeeForm.value);
    this.userService.addUser(this.employeeForm.value);
    this.employeeForm.reset();
    this.router.navigate(['/employees']);

  }


  updateEmployee() {
    console.warn('Employee updated', this.employeeForm.value);
    this.userService.updateUser(this.id, this.employeeForm.value);
    this.employeeForm.reset();
    this.router.navigate(['/employees']);

  }

}
