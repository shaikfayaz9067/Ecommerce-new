import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user'; // Import your User interface

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    this.loginService.login(this.username, this.password).subscribe(
      (user) => {
        if (user) {
          // Navigate to home or any other component upon successful login
          this.authService.setUser(user);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'An error occurred. Please try again.';
      }
    );
  }
}
