import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user'; // Import your User interface

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8081/api/eusers'; // URL of your backend API

  constructor(private http: HttpClient) {}

  // Fetch users and validate username and password
  login(username: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}`).pipe(
      map((users) => {
        const user = users.find(
          (user) => user.username === username && user.password === password
        );
        return user || null; // Return the user object or null
      }),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return of(null); // Return null on error
      })
    );
  }

  // Method to handle user signup (POST)
  signup(userData: User): Observable<User | null> {
    // Change the return type to include null
    return this.http.post<User>(`${this.apiUrl}/signup`, userData).pipe(
      catchError((error) => {
        console.error('Error during signup:', error);
        return of(null); // Return null on error
      })
    );
  }
}
