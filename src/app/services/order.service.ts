import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8081/api/eorders'; // API URL

  constructor(private http: HttpClient) {}

  // Method to place an order
  placeOrder(orderData: Order): Observable<any> {
    return this.http.post(this.apiUrl, orderData);
  }

  // Method to get orders by user ID
  getOrdersByUserId(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Method to get a single order by ID
  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  // Method to cancel an order by ID
  cancelOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${orderId}`);
  }

  // You can add additional methods for order management as needed
}
