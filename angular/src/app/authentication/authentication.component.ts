import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  activeForm: 'login' | 'register' = 'login';
  registerError: string | null = null;
  loginError: string | null = null;

  registerUserData = {
    username: '',
    email: '',
    password: ''
  };

  loginCredentials = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Detect the route and set the activeForm accordingly
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const route = this.activatedRoute.snapshot.url[0]?.path;
        this.activeForm = route === 'register' ? 'register' : 'login';
      });
  }

  redirectTo(target: string): void {
    this.activeForm = target === 'register' ? 'register' : 'login';
    this.router.navigate([`/${target}`]);
  }

  register(): void {
    this.authService.register(this.registerUserData).subscribe(
      (response) => {
        console.log('Registration successful!', response);
        // Redirect to the users route after registration
      },
      (error) => {
        console.error('Registration failed:', error );
        this.registerError = error.message;
      }
      // (error) => {
      //   console.error('Registration failed:', error);
      //   this.registerError = error.message === AppErrors.USER_ALREADY_EXISTS ?
      //                         AppErrors.USER_ALREADY_EXISTS : AppErrors.INTERNAL_SERVER_ERROR;
      // }
    );
  }

  login(): void {
    this.authService.login(this.loginCredentials).subscribe(
      (response) => {
        console.log('Login successful!', response);
        this.authService.saveToken(response.access_token);
        // Redirect to the users route after login
        this.router.navigate(['/users']);
      },
      (error) => {
        console.error('Login failed:', error);
        // Display error message
        this.loginError = error.message;
      }
      // (error) => {
      //   console.error('Login failed:', error);
      //   this.loginError = error.message === AppErrors.INVALID_CREDENTIALS ?
      //                      AppErrors.INVALID_CREDENTIALS : AppErrors.INTERNAL_SERVER_ERROR;
      // }
    );
  }

}
