import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmployeesComponent } from './pages/employees/employees.component';


export const routes: Routes = [{
    path: '',
    component: HomeComponent
},{ 
    path: 'employees',
    component: EmployeesComponent
}]