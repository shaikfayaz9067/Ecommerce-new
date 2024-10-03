import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Assuming you have an auth service

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn(); // Check login status
  }

  logout() {
    this.authService.logout(); // Perform logout
  }
}
