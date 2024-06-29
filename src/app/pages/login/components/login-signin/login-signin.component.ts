import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of, finalize } from 'rxjs';
import { FirebaseAuthService } from 'src/app/core/services/firebase-auth.service';
import { required } from 'src/utils/forms';

@Component({
  selector: 'app-login-signin',
  templateUrl: './login-signin.component.html',
  styleUrl: './login-signin.component.scss'
})
export class LoginSigninComponent {
  form = new FormGroup({
    email: new FormControl('', required([Validators.email])),
    password: new FormControl('', required([Validators.minLength(8)])),
  })

  errorMessage?: string
  isLoading: boolean = false

  constructor(readonly auth: FirebaseAuthService) {

  }

  onSubmit() {
    if (this.isLoading) {
      return;
    }
    
    const {email, password} = this.form.getRawValue();

    this.isLoading = true;
    this.auth.signIn(email, password).pipe(
      catchError(error => {
        if (error instanceof Error) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = JSON.stringify(error);
        }
        return of();
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }
}
