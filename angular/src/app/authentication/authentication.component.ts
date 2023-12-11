import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  registerUserData = {
    username: '',
    email: '',
    password: ''
  };

  loginCredentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) {}

  register(): void {
    this.authService.register(this.registerUserData).subscribe(
      response => {
        // Handle successful registration response
        console.log('Registration successful!', response);
        // Redirect or display success message
      },
      error => {
        // Handle error
        console.error('Registration failed:', error);
        // Display error message
      }
    );
  }

  login(): void {
    this.authService.login(this.loginCredentials).subscribe(
      response => {
        // Handle successful login response
        console.log('Login successful!', response);
        // Store user token or redirect to dashboard
      },
      error => {
        // Handle error
        console.error('Login failed:', error);
        // Display error message
      }
    );
  }
}
