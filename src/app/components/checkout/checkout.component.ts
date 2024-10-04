import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AddressService } from '../../services/address.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Address } from '../../models/address';
import { Order, OrderItem } from '../../models/order';
import { CartItem } from '../../models/product';
import { Product } from '../../models/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  addresses: Address[] = [];
  selectedAddress: Address | null = null;
  cartItems: CartItem[] = [];
  orderItems: OrderItem[] = [];
  products: Product[] = [];
  totalAmount: number = 0;
  userId: string = '';
  showAddressForm: boolean = false;

  constructor(
    private orderService: OrderService,
    private addressService: AddressService,
    private productService: ProductService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUser()?.id || '';

    // Fetch user's addresses
    this.addressService.getAddressesByUserId(this.userId).subscribe(
      (addresses: Address[]) => {
        this.addresses = addresses;
      },
      (error) => {
        console.error('Error fetching addresses:', error);
      }
    );

    // Fetch cart items from the API
    this.productService.getCartItems(this.userId).subscribe(
      (cartItems: CartItem[]) => {
        this.cartItems = cartItems;
        this.loadOrderItems();
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  loadOrderItems(): void {
    // Ensure order items are loaded and the total amount is calculated
    this.cartItems.forEach((item) => {
      this.productService.getProductById(item.productId).subscribe(
        (product: Product) => {
          this.products.push(product); // Add to products array for display
          this.orderItems.push({
            productId: item.productId,
            quantity: item.quantity,
            price: product.price, // Assign product price
          });

          // Recalculate the total amount
          this.totalAmount = this.calculateTotalAmount();
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    });
  }

  // Get the quantity of a product in the cart
  getCartQuantity(productId: string): number {
    const cartItem = this.cartItems.find(
      (item) => item.productId === productId
    );
    return cartItem ? cartItem.quantity : 0;
  }

  // Update selected address from AddressComponent
  selectAddress(address: Address | null): void {
    this.selectedAddress = address;
  }

  placeOrder(): void {
    // Validate that an address has been selected
    if (!this.selectedAddress) {
      this.snackBar.open(
        'Please select or enter a valid shipping address.',
        'Close',
        {
          duration: 3000,
          verticalPosition: 'top',
        }
      );
      return;
    }

    // Ensure that order items and total amount are properly calculated
    if (this.orderItems.length === 0 || this.totalAmount === 0) {
      this.snackBar.open(
        'Your cart is empty or the total amount is incorrect.',
        'Close',
        {
          duration: 3000,
          verticalPosition: 'top',
        }
      );
      return;
    }

    // Construct the order data
    const orderData: Order = {
      userId: this.userId,
      items: this.orderItems,
      totalAmount: this.totalAmount,
      status: 'pending',
      shippingAddress: this.selectedAddress, // Ensure the selected address is passed
    };

    // Place order by making the API call
    this.orderService.placeOrder(orderData).subscribe(
      (response) => {
        console.log('Order placed successfully', response);
        this.snackBar.open('Order placed successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['snackbar-success'], // Optional: Custom styling
        });
        this.deleteCartItems();
      },

      (error) => {
        console.error('Error placing order', error);
        this.snackBar.open(
          'There was an error placing your order. Please try again.',
          'Close',
          {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-error'], // Optional: Custom styling
          }
        );
      }
    );
  }

  deleteCartItems(): void {
    // Call the service to delete all items in the cart for this user
    this.productService.deleteCartItems(this.userId).subscribe(
      (response) => {
        console.log('Cart items deleted successfully', response);

        // Show success message
        this.snackBar.open('Cart items deleted successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });

        // Delay navigation to the order page
        setTimeout(() => {
          this.router.navigate(['/order']);
        }, 3000); // Delay of 3000 milliseconds (3 seconds)
      },
      (error) => {
        console.error('Error deleting cart items', error);
        this.snackBar.open(
          'There was an error deleting your cart items. Please try again.',
          'Close',
          {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          }
        );
      }
    );
  }

  // Calculate total amount
  private calculateTotalAmount(): number {
    return this.orderItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  }
}
