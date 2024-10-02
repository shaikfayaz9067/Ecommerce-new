import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AddressService } from '../../services/address.service'; // Assuming AddressService exists
import { Address } from '../../models/address';
import { Order, OrderItem } from '../../models/order';
import { AuthService } from '../../services/auth.service'; // Assuming AuthService exists

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  addresses: Address[] = []; // Store addresses fetched from the service
  selectedAddress: Address | null = null;
  orderItems: OrderItem[] = []; // Populate from cart
  totalAmount: number = 0; // Calculate from cart
  userId: string = ''; // Get from AuthService
  showAddressForm: boolean = false; // Flag to show/hide new address form

  // New address input fields
  newAddressInput: string = '';
  newCityInput: string = '';
  newStateInput: string = '';
  newZipCodeInput: string = '';
  newCountryInput: string = '';

  constructor(
    private orderService: OrderService,
    private addressService: AddressService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUser()?.id || ''; // Replace with actual method to get userId

    // Fetch user's addresses
    this.addressService
      .getAddressesByUserId(this.userId)
      .subscribe((addresses: Address[]) => {
        this.addresses = addresses;
      });

    // Fetch cart items and calculate totalAmount
    this.orderItems = this.getCartItems();
    this.totalAmount = this.calculateTotalAmount();
  }

  selectAddress(address: Address | null): void {
    this.selectedAddress = address;
  }

  placeOrder(): void {
    const shippingAddress: Address = this.selectedAddress || {
      id: '', // You may want to generate an ID or leave it empty if it's new
      userId: this.userId,
      street: this.newAddressInput,
      city: this.newCityInput,
      state: this.newStateInput,
      zipCode: this.newZipCodeInput,
      country: this.newCountryInput,
    };

    const orderData: Order = {
      userId: this.userId,
      items: this.orderItems,
      totalAmount: this.totalAmount,
      status: 'pending',
      shippingAddress: shippingAddress,
    };

    this.orderService.placeOrder(orderData).subscribe(
      (response) => {
        console.log('Order placed successfully', response);
        alert('Order placed successfully!');
      },
      (error) => {
        console.error('Error placing order', error);
        alert('There was an error placing your order. Please try again.');
      }
    );
  }

  // Placeholder for fetching cart items
  private getCartItems(): OrderItem[] {
    // Replace with actual logic to fetch cart items from a service
    return [
      { productId: 'prod1', quantity: 2, price: 50 },
      { productId: 'prod2', quantity: 1, price: 30 },
    ];
  }

  // Placeholder for calculating total amount
  private calculateTotalAmount(): number {
    return this.orderItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  }
}
