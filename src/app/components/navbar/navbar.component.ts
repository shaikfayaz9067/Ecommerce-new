import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Import your authentication service
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  // Method to handle logout
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Logout the user
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}
