import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { 
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [FormsModule, MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,
    MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  employees: Employee[] = [];
  id: string = "";
  displayedColumns: string[] = [
    'id',
    'employee_name',
    'employee_age',
    'employee_salary',
    'profile_image',
    'anual_salary'
  ];

  constructor(private service: EmployeeService, public snack : MatSnackBar) {
    this.getEmployees();
  }


  public openSnackBar(message: string) {
    this.snack.open(message, "OK", {duration: 5000})
  }

  public getEmployees() {
    this.service.getEmployees().subscribe({
      next: response => {
        this.employees = response
      },
      error: error => {
          this.openSnackBar("Too many request")
      }
    });
  }

  public findById() {
    if (this.id == '') {
      this.getEmployees();
    } else {
      this.service.getEmployeeById(this.id).subscribe({
        next: employee => {
          this.employees = [];
          this.employees.push(employee);
        },
        error: error => {
          this.openSnackBar("Too many request")
        }
      })
    }
  }
}
