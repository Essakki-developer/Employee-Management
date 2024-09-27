//Employee service used to access index db data.
import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
/**
 * Interface for employee details.
 */
interface Employee {
  id: number;
  name: string;
  role: number;
  startDate: string;
  endDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  /**
   * Service constructor to inject the required db services.
   * @param dbService used to access indexed db.
   */
  constructor(private dbService: NgxIndexedDBService) { }
  /**
   * Method which is used to store employee details into indexed db.
   * @param employee which holds the employee details to be added.
   * @returns sucess or failure response.
   */
  addEmployee(employee: { name: string, role: string, startDate: string, endDate: string }): Observable<any> {
    return this.dbService.add('employees', employee).pipe(
      catchError((error) => {
        if (error.name === 'NotFoundError') {
          // handle the case where the database or table doesn't exist
          console.error('Database or table not found:', error.message);
          return throwError(() => new Error('The database or table does not exist. Please contact the administrator.'));
        }
        if (error.name === 'ConstraintError') {
          // handle duplicate entries
          console.error('Duplicate entry:', error.message);
          return throwError(() => new Error('An employee with the same details already exists.'));
        }
        // handle other types of errors 
        console.error('Error adding employee:', error.message);
        return throwError(() => new Error('Error adding employee. Please try again later.'));
      })
    );
  }
  /**
   * Method which is used to fetch employee details by their employee id.
   * @param id which holds the employee id
   * @returns employee details in case of success or returns error message in case of failure.
   */
  getEmployeeById(id: number): Observable<any> {
    return this.dbService.getByKey('employees', id).pipe(
      catchError((error) => {
        console.error('Error fetching employee:', error);
        return throwError(() => new Error('Error accessing the database.'));
      }),
      map((employee) => {
        //Employee doesn't exists in db.
        if (!employee) {
          throw new Error(`No employee found with ID ${id}.`);
        }
        return employee;
      })
    );
  }
  /**
   * Method which is used to fetch all employee details.
   * @returns all employee details or failure message.
   */
  getAllEmployees(): Observable<any[]> {
    return this.dbService.getAll('employees').pipe(
      catchError((error) => {
        console.error('Error fetching all employees:', error);
        return throwError(() => new Error('Error fetching employees. Please try again later.'));
      })
    );
  }

  /**
   * Method which is used to delete employee details from the db.
   * @param id which holds the employee id to be deleted.
   * @returns success or failure response for deletion.
   */

  deleteEmployee(id: number): Observable<any> {
    return this.dbService.getByKey('employees', id).pipe(
      switchMap((employee) => {
        //Employee doesn't exists in db.
        if (!employee) {
          return throwError(() => new Error(`No employee found with ID ${id}.`));
        }
        // If employee exists, proceed with deletion
        return this.dbService.delete('employees', id);
      }),
      catchError((error) => {
        console.error('Error deleting employee:', error);
        return throwError(() => new Error(`Error deleting employee with ID ${id}. Please try again later.`));
      })
    );
  }
  /**
   * Method which is used to update employee details
   * @param employee holds the employee data to be updated
   * @returns success or failure response.
   */

  updateEmployee(employee: { id: number, name: string, role: number, startDate: string, endDate: string }) {
    //Fetching employee details by employee id
    return this.dbService.getByKey<Employee>('employees', employee.id).pipe(
      switchMap((existingEmployee: Employee | undefined) => {
        //Employee doesn't exists in db.
        if (!existingEmployee) {
          return throwError(() => new Error(`No employee found with ID ${employee.id}.`));
        }
        if (existingEmployee.id === employee.id) {
          // Return an Observable for the update operation
          return this.dbService.update('employees', employee);
        } else {
          // Return an error Observable if the Id do not match
          return throwError(() => new Error(`Employee ID mismatch.`));
        }
      }),
      catchError((error) => {
        console.error(`Error updating employee with ID ${employee.id}:`, error);
        return throwError(() => new Error(`Error updating employee with ID ${employee.id}. Please try again later.`));
      })
    );
  }
}
