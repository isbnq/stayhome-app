import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of, finalize } from 'rxjs';
import { FirebaseAuthService } from 'src/app/core/services/firebase-auth.service';
import { required } from 'src/utils/forms';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent {
  form = new FormGroup({
    name: new FormControl('', required([Validators.minLength(2)])),
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

    const {name, email, password} = this.form.getRawValue();

    this.isLoading = true;
    this.auth.singUp(name, email, password).pipe(
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
