import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmployeeDetailsComponent } from './add-edit-employee-details.component';

describe('AddEditEmployeeDetailsComponent', () => {
  let component: AddEditEmployeeDetailsComponent;
  let fixture: ComponentFixture<AddEditEmployeeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditEmployeeDetailsComponent]
    });
    fixture = TestBed.createComponent(AddEditEmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
