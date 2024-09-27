import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEditEmployeeDetailsComponent } from './employee-details/add-edit-employee-details/add-edit-employee-details.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeesListComponent } from './employee-details/employees-list/employees-list.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { CalenderComponent } from './shared/calender/calender.component';
import { TopNavComponent } from './shared/top-nav/top-nav.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
//To create employee db
const dbConfig: DBConfig = {
  name: 'EmployeeDB',
  version: 1,
  objectStoresMeta: [{
    store: 'employees',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'role', keypath: 'role', options: { unique: false } },
      { name: 'startDate', keypath: 'startDate', options: { unique: false } },
      { name: 'endDate', keypath: 'endDate', options: { unique: false } },

    ]
  }]
};
@NgModule({
  declarations: [
    AppComponent,
    AddEditEmployeeDetailsComponent,
    EmployeesListComponent,
    CalenderComponent,
    TopNavComponent

  ],
  imports: [
    NgxIndexedDBModule.forRoot(dbConfig),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    RouterModule,
    MatTooltipModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
