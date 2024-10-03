import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user'; // Import your User interface

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8081/api/eusers'; // URL of your backend API

  constructor(private http: HttpClient) {}

  // Use GET to login by passing username and password in the URL
  login(username: string, password: string): Observable<User | null> {
    const url = `${this.apiUrl}/login/${username}?password=${password}`; // Build the URL
    return this.http.get<User>(url).pipe(
      catchError((error) => {
        console.error('Error during login:', error);
        return of(null); // Return null on error
      })
    );
  }

  // Method to handle user signup (POST)
  signup(userData: User): Observable<User | null> {
    return this.http.post<User>(`${this.apiUrl}/signup`, userData).pipe(
      catchError((error) => {
        console.error('Error during signup:', error);
        return of(null); // Return null on error
      })
    );
  }
}
