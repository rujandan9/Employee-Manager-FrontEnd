import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { EmployeesComponent } from './employees/employees.component';
import { ImagesComponent } from './images/images.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent, 
  },
  {
    path : '',
    component: EmployeesComponent, canActivate: [AuthGuard]
  },
  {
    path : 'images',
    component: ImagesComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
