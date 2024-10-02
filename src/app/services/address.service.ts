// src/app/services/address.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl = 'http://localhost:8081/api/addresses'; // Update with your backend API

  constructor(private http: HttpClient) {}

  // Fetch all addresses for a specific user
  getAddressesByUserId(userId: string): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Add a new address
  addAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.apiUrl, address);
  }
}
