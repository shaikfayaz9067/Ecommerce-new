import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8081/api/orders'; // Change to your actual backend API

  constructor(private http: HttpClient) {}

  // Method to place an order
  placeOrder(orderData: any): Observable<any> {
    return this.http.post(this.apiUrl, orderData); // Make POST request to the backend
  }

  // You can add more methods like getOrderHistory(), cancelOrder(), etc.
}
