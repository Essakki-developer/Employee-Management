//Component which is used to add or edit employee details.
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-edit-employee-details',
  templateUrl: './add-edit-employee-details.component.html',
  styleUrls: ['./add-edit-employee-details.component.scss']
})
export class AddEditEmployeeDetailsComponent implements OnInit {
  /** Variable which is used to store roles of an employee */
  roles: string[] = ['Manager', 'Developer', 'Designer', 'Tester', 'HR'];
  /**
   * Employee form is used to store employee details.
   */
  employeeForm!: FormGroup;
  /**
   * Variable which is used to store employee id which is send from employee list component.
   */
  employeeId!: String | Number;
  /**
   * Variable which is used toggle start date field's calendar.
   */
  startCalender: boolean = false
  /**
   * Variable which is used toggle end date field's calendar.
   */
  endCalender: boolean = false;
  /**
   * Variable which is used to display a date as selected in end date calendar.
   */
  endDateValue: any = null;
  /**
  * Variable which is used to display a date as selected in start date calendar.
  */
  startDateValue: any = null;
  /**
   * Variable which is used to store tile of the page.
   */
  pageTitle!: string;
  /**
   * Component constructor to inject the required services.
   * @param snackBar to display snackbar for success or failure cases.
   * @param route to get the activted route parameter.
   * @param router to navigate to some other pages.
   * @param employeeService to access methods to add,edit,retrive and delete employee data from indexed db.
   * @param datePipe to format date values.
   */
  constructor(private snackBar: MatSnackBar,
    private route: Router,
    private router: ActivatedRoute,
    private employeeService: EmployeeService,
    private datePipe: DatePipe
  ) { }

  /**Component OnInit life cycle hook. */
  ngOnInit(): void {
    this.router.queryParams.subscribe((params: Params) => {
      this.employeeId = params['id'];
    });
    this.pageTitle = this.employeeId ? 'Edit Employee Details' : 'Add Employee Details';
    // To fetch employee details if already exists in db.
    if (this.employeeId) {
      this.employeeService.getEmployeeById(Number(this.employeeId))
        .subscribe({
          next: (resp) => {
            if (!resp) {
              //No employee data found.
              throw new Error(`No employee found with ID ${this.employeeId}.`);
            }
            this.formInitialize(resp);
          },
          error: (error) => {
            console.error('Error:', error.message);
            alert(error.message);
          }
        });
    }
    this.formInitialize();
  }
  /**
   * Method which is used to initialize form data.
   * @param data employee data if already exists in db.
   */
  formInitialize(data?: any): void {
    this.employeeForm = new FormGroup({
      name: new FormControl(data?.name ? data.name : '', { validators: [Validators.required, Validators.maxLength(40)] }),
      role: new FormControl(data?.role ? data.role : '', Validators.required),
      startDate: new FormControl(data?.startDate ? data.startDate : '', Validators.required),
      endDate: new FormControl(data?.endDate ? data.endDate : '')
    });
    this.endDateValue = data?.endDate ? new Date(data?.endDate) : new Date();
    this.startDateValue = data?.startDate ? new Date(data?.startDate) : new Date()
  }
  /**
   * Method which is used to submit the employee form.
   */
  onSubmit(): void {
    if (this.employeeId && !this.employeeForm.pristine) {
      this.employeeForm.value['id'] = Number(this.employeeId);
      this.employeeService.updateEmployee(this.employeeForm.value).subscribe({
        next: (updateRes: any) => {
          this.snackBar.open('Employee details updated successfully!', 'X', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            panelClass: ['snackbar-success']
          });
          this.route.navigate(['']);
        }, error: (error) => {
          console.error('Error updating employee:', error.message);
          alert(error.message);
        }
      });
    }
    else {
      const newEmployee = this.employeeForm.value;
      this.employeeService.addEmployee(newEmployee).subscribe({
        next: (res) => {
          this.snackBar.open('Employee details saved successfully!', 'X', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            panelClass: ['snackbar-success']
          });
          this.route.navigate(['']);
        }, error: (error) => {
          alert(error.message);
        }
      });
    }
    this.employeeForm.reset();
  }
  /**
   * Method which is used to cancel form submission and navigates to employee list.
   */
  onCancel(): void {
    this.employeeForm.reset();
    this.route.navigate(['']);
  }
  /**
   * Method which is used to open start date picker.
   */
  openDatePicker(): void {
    this.startCalender = !this.startCalender;
  }
  /**
    * Method which is used to open end date picker.
    */
  openEndPicker(): void {
    this.endCalender = !this.endCalender;
  }
  /**
   * Method which catches the (start date) selected date emitted from calendar component.
   * @param event parameter which passes selected date.
   */
  startDateCall(event: any): void {
    const date = new Date(event);
    const eveDate = this.datePipe.transform(date, 'dd MMM yyyy');
    this.employeeForm.get('startDate')?.setValue(eveDate);
    this.startDateValue = date;
    this.startCalender = false;
  }
  /**
   * Method which catches the (end date) selected date emitted from calendar component.
   * @param event parameter which passes selected date.
   */
  endDateCall(event: any): void {
    const date = new Date(event);
    const eveDate = this.datePipe.transform(date, 'dd MMM yyyy');
    this.employeeForm.get('endDate')?.setValue(eveDate);
    this.endDateValue = date;
    this.endCalender = false;
  }
}
