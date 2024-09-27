//Component which is used to display employees list.
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  /**
   * Component constructor to inject the required services.
   * @param route to navigate to some other pages
   * @param employeeService to access methods to add,edit,retrive and delete employee data from indexed db.
   * @param snackBar to display snackbar for success or failure cases.
   */
  constructor(private route: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) { }
  /**
   * Variable which is used to store employee data from index db.
   */
  employees: any[] = [];
  /**
   * Variable which is used to store current employee details.
   */
  currentEmployees!: any[];
  /**
  * Variable which is used to store previous employee details.
  */
  previousEmployees!: any[];
  /**
   * Variable which is used to store tile of the page.
   */
  pageTitle!: string;

  /**Component OnInit life cycle hook. */
  ngOnInit(): void {
    this.pageTitle = 'Employee List';
    this.getAllEmployees();
  }
  /**
   * Method which is used to fetch employee data from the indexed Db.
   */
  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (res) => {
        if (res) {
          this.employees = res;
          this.currentEmployees = this.employees.filter((item) => !item.endDate);
          this.previousEmployees = this.employees.filter((item) => item.endDate);
        }
      }, error: (error) => {
        console.error('Error:', error.message);
        alert(error.message);
      }
    });
  }
  /**
   * Method which is used to navigate to edit employee page.
   * @param event which stores the selected employee's id.
   */
  onEdit(event: any): void {
    this.route.navigate(['addEditEmployee'], { queryParams: { id: event.id } });
  }
  /**
   * Method which is used to delete employee details.
   * @param event which store employee id to be deleted.
   */
  onDelete(event: any): void {
    this.employeeService.deleteEmployee(event.id)
      .subscribe({
        next: () => {
          this.snackBar.open(`Employee details deleted successfully.`, 'X', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            panelClass: ['snackbar-success']
          });
          this.getAllEmployees();
        },
        error: (error) => {
          console.error('Error:', error.message);
          this.snackBar.open(`Failed to delete employee details.`, 'X', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            panelClass: ['snackbar-success']
          });
        }
      });

  }
  /**
   * Method which is used to navigate to add employee page.
   */
  addEmployee(): void {
    this.route.navigate(['/addEditEmployee'])
  }

}
