import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './auth/auth-component/login/login';
import { Signup } from './auth/auth-component/signup/signup';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  {path: "login",component:Login},
  {path: "signup",component:Signup},
  {
    path: "admin",
    loadChildren:()=> import("./modules/admin/admin-module").then(e=>e.AdminModule)
  },
  {
    path: "customer",
    loadChildren:()=> import("./modules/customer/customer-module").then(e=>e.CustomerModule)
  },
  { path: '**', redirectTo: 'login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
