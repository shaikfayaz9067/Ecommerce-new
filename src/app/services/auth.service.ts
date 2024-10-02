import { Injectable } from '@angular/core';
import { LoginService } from './login.service'; // Import your LoginService
import { User } from '../models/user'; // Import your User interface

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;

  constructor(private loginService: LoginService) {}

  // Set the user data after successful login
  setUser(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user)); // Store user info in local storage
  }

  // Get the currently logged-in user
  getUser(): User | null {
    if (!this.user) {
      const userData = localStorage.getItem('user');
      this.user = userData ? JSON.parse(userData) : null;
    }
    return this.user;
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  // Logout the user
  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }
}
