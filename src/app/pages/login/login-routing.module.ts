import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { LoginSigninComponent } from './components/login-signin/login-signin.component';

const routes: Routes = [
  {
    path: "signin",
    component: LoginSigninComponent
  },
  {
    path: 'signup',
    component: LoginSignupComponent
  },
  { path: "**", redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
