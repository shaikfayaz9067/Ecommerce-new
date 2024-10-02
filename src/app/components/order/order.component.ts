import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { AuthService } from '../../services/auth.service'; // Assuming AuthService exists

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  userId: string = ''; // Declare userId as a string

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchUserIdAndOrders();
  }

  fetchUserIdAndOrders(): void {
    const user = this.authService.getUser(); // Get user object from AuthService
    if (user && user.id) {
      // Check if user is defined and has an id
      this.userId = user.id; // Assign userId safely
      this.fetchOrders();
    } else {
      console.error('User is not logged in.');
      // Handle user not logged in scenario (e.g., redirect to login page)
    }
  }

  fetchOrders(): void {
    this.orderService.getOrdersByUserId(this.userId).subscribe(
      (data: Order[]) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
