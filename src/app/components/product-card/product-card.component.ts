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
  @Output() addToCartEvent = new EventEmitter<string>(); // Output event to notify when adding to cart

  // Change authService to public
  constructor(public authService: AuthService) {}

  // Method to handle click event on Add to Cart button
  addToCart() {
    this.addToCartEvent.emit(this.product.id); // Emit the product ID
  }
}
