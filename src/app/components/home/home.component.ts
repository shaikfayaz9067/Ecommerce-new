import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'; // Import your product service
import { AuthService } from '../../services/auth.service'; // Import your authentication service
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = []; // Array to hold all products
  filteredProducts: Product[] = []; // Array for displaying filtered products

  constructor(
    private productService: ProductService,
    public authService: AuthService // Inject AuthService to check login status
  ) {}

  ngOnInit(): void {
    // Fetch the product list on initialization
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = products; // Initialize the filtered list with all products
    });
  }

  // Method to handle search functionality
  search(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    if (query) {
      // Filter products based on the search query
      this.filteredProducts = this.products.filter(
        (product) =>
          product.category.name.toLowerCase().includes(query) ||
          product.subcategory.name.toLowerCase().includes(query)
      );
    } else {
      this.filteredProducts = this.products; // Reset to all products if no search query
    }
  }

  // Method to handle adding a product to the cart
  addToCart(productId: string): void {
    if (this.authService.isLoggedIn()) {
      this.productService.addToCart(productId).subscribe(
        () => {
          console.log(`Product ${productId} added to cart successfully`);
          // Optionally provide feedback to the user, e.g., a toast message
        },
        (error) => {
          console.error(`Error adding product to cart:`, error);
        }
      );
    } else {
      console.log('User not logged in. Redirect to login page.');
      // Optionally redirect to the login page if the user is not logged in
    }
  }
}
