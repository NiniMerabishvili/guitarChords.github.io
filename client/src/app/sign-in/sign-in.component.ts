import { Component } from '@angular/core';
import { AuthServiceService } from '../shared/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  onSignIn() {
    this.authService.signIn(this.email, this.password);
  }
}
