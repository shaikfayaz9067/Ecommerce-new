import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Import your authentication service

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  // Method to handle logout
  logout() {
    this.authService.logout();
  }
}
