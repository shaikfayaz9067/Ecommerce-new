import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Assuming you have an AuthService for handling authentication
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  phoneNumber: string = '';

  // Injecting AuthService and Router for handling signup and navigation
  constructor(
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService
  ) {}

  // Method called when the form is submitted
  signup() {
    if (this.name && this.email && this.password) {
      // Prepare the user data
      const userData = {
        username: this.name,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
      };

      // Call AuthService to handle the signup logic
      this.loginService.signup(userData).subscribe(
        (response: any) => {
          console.log('User signed up successfully:', response);
          // Redirect to login or home page after signup
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error('Error during signup:', error);
          // You can add further error handling here
        }
      );
    } else {
      console.error('All fields are required.');
    }
  }
}
