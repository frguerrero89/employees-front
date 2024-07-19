import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesComponent } from './employees.component';
import { EmployeeService } from '../../services/employee.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { MatSnackBar } from '@angular/material/snack-bar';

export class MatSnackBarStub {
  open() {
    return {
      onAction: () => of({})
    };
  }
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    employee_name: "Tiger Nixon",
    employee_salary: 320800,
    employee_age: 61,
    profile_image: "",
    anual_salary: 3849600
  },
  {
    id: 2,
    employee_name: "Garrett Winters",
    employee_salary: 170750,
    employee_age: 63,
    profile_image: "",
    anual_salary: 2049000
  },
  {
    id: 3,
    employee_name: "Ashton Cox",
    employee_salary: 86000,
    employee_age: 66,
    profile_image: "",
    anual_salary: 1032000
  }]

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let mockEmployeeService: jasmine.SpyObj<EmployeeService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    mockEmployeeService = jasmine.createSpyObj('EmployeeService', ['getEmployees', 'getEmployeeById']);
    await TestBed.configureTestingModule({
      imports: [EmployeesComponent, BrowserAnimationsModule],
      providers: [EmployeeService, provideHttpClient(), provideHttpClientTesting(), { provide: MatSnackBar, useClass: MatSnackBarStub }],
    }).compileComponents();
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open snackBar', async () => {
    const message = "Too many requests";
    spyOn(component.snack, "open").and.callThrough();
    component.openSnackBar(message);
    expect(component.snack.open).toHaveBeenCalled();
    expect(component.snack.open).toHaveBeenCalledWith(message, 'OK', { duration: 5000 });
  });

  it('should fetch employees on initialization', () => {
    mockEmployeeService.getEmployees.and.returnValues(of(mockEmployees));
    component.findById();
    expect(component.employees).toEqual(mockEmployees);
  });

  it('should fetch employee by ID', () => {
    const mockEmployee = mockEmployees[0];
    component.id = '1';
    mockEmployeeService.getEmployeeById.and.returnValue(of(mockEmployee));
    component.findById();
    expect(component.employees).toEqual([mockEmployee]);
  });

  it('should handle error when fetching employees', () => {
    const message = "Too many requests";
    mockEmployeeService.getEmployees.and.throwError(message);
    fixture.detectChanges();
    spyOn(component.snack, "open").and.callThrough();
    component.openSnackBar(message);
    expect(component.snack.open).toHaveBeenCalled();
    expect(component.snack.open).toHaveBeenCalledWith(message, 'OK', { duration: 5000 });
  });

});
