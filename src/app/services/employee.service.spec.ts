import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Employee } from '../models/employee.model';
import { environment } from '../../environments/environment.development';
import { provideHttpClient } from '@angular/common/http';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), EmployeeService],
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve an employee by ID', () => {
    const dummyEmployee: Employee = { id: 123, employee_name: 'John Doe', employee_age: 19, employee_salary: 385750, anual_salary: 4629000, profile_image: '...' };
    const id = '123';

    service.getEmployeeById(id).subscribe((employee) => {
      expect(employee).toEqual(dummyEmployee);
    });

    const req = httpMock.expectOne(`${environment.server.protocol}://${environment.server.address}:${environment.server.port}${environment.server.context}${environment.api.byId.path}${id}`);
    expect(req.request.method).toBe(environment.api.byId.method);
    req.flush(dummyEmployee);
  });

  it('should retrieve a list of employees', () => {
    const dummyEmployees = [
      { id: 123, employee_name: 'John Doe', employee_age: 19, employee_salary: 385750, anual_salary: 4629000, profile_image: '...' },
      { id: 124, employee_name: 'John Doe2', employee_age: 19, employee_salary: 385750, anual_salary: 4629000, profile_image: '...' },
      { id: 125, employee_name: 'John Doe3', employee_age: 19, employee_salary: 385750, anual_salary: 4629000, profile_image: '...' }
    ];
    service.getEmployees().subscribe((employees) => {
      expect(employees).toEqual(dummyEmployees);
    });

    const req = httpMock.expectOne(`${environment.server.protocol}://${environment.server.address}:${environment.server.port}${environment.server.context}${environment.api.all.path}`);
    expect(req.request.method).toBe(environment.api.all.method);
    req.flush(dummyEmployees);
  });
});