import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'; // Import your product service
import { AuthService } from '../../services/auth.service'; // Import your authentication service
import { CartItem, Product } from '../../models/product';
import { Router } from '@angular/router';

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
    public authService: AuthService, // Inject AuthService to check login status
    private router: Router
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
  // Updated method in HomeComponent
  addToCart(cartData: { productId: string; quantity: number }): void {
    if (this.authService.isLoggedIn()) {
      const userId = this.authService.getUser()?.id || ''; // Get the logged-in user's ID

      if (userId) {
        const cartItem: CartItem = {
          productId: cartData.productId,
          quantity: cartData.quantity,
          userId: userId, // Ensure this is also a string
        };
        this.productService
          .addToCart(cartData.productId, cartData.quantity, userId)
          .subscribe(
            () => {
              console.log(
                `Product ${cartData.productId} added to cart successfully`
              );
            },
            (error) => {
              console.error(`Error adding product to cart:`, error);
            }
          );
      } else {
        console.error('Unable to retrieve user ID for adding to cart.');
      }
    } else {
      console.log('User not logged in. Redirecting to login page.');
      this.router.navigate(['/login']);
    }
  }
}
