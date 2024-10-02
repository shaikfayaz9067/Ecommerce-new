import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  address: string = '';

  constructor(private orderService: OrderService) {}

  placeOrder() {
    this.orderService.placeOrder({ address: this.address }).subscribe(() => {
      console.log('Order placed successfully');
    });
  }
}
