import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { LoginSigninComponent } from './components/login-signin/login-signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';


@NgModule({
  declarations: [
    LoginSignupComponent,
    LoginSigninComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    TuiButtonModule,
    TuiInputModule,
    TuiInputPasswordModule
  ]
})
export class LoginModule { }
