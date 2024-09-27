import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './employee-details/employees-list/employees-list.component';
import { AddEditEmployeeDetailsComponent } from './employee-details/add-edit-employee-details/add-edit-employee-details.component';

const routes: Routes = [
  { path: '', component: EmployeesListComponent },
  { path: 'addEditEmployee', component: AddEditEmployeeDetailsComponent },
  { path: 'addEditEmployee/:id', component: AddEditEmployeeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
