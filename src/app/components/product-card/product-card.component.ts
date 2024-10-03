import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product'; // Adjust path as necessary
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: Product; // Input property for the product
  @Output() addToCartEvent = new EventEmitter<{
    productId: string;
    quantity: number;
  }>(); // Emit both productId and quantity

  constructor(public authService: AuthService) {}

  // Method to handle click event on Add to Cart button
  addToCart(quantity: number = 1) {
    const cartData = {
      productId: this.product.id, // Emit the product ID
      quantity: quantity, // Emit the quantity
    };
    this.addToCartEvent.emit(cartData); // Emit both productId and quantity
  }
}
