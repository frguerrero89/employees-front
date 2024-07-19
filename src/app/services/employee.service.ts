import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

const { server, api } = env
const url = `${server.protocol}://${server.address}:${server.port}${server.context}`

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  public getEmployeeById(id: string): Observable<Employee> {
    let apiUrl = `${url}${api.byId.path}${id}`;
    return this.http.request<Employee>(api.byId.method, apiUrl);
  }

  public getEmployees(): Observable<Employee[]> {
    let apiUrl = `${url}${api.all.path}`;
    return this.http.request<Employee[]>(api.all.method, apiUrl);
  }
}
