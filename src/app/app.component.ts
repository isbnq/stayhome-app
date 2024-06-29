import { Component } from '@angular/core';
import { FirebaseAuthService } from './core/services/firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  constructor(readonly auth: FirebaseAuthService) {}

  
}
