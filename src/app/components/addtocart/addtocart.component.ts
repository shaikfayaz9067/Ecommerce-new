import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartItem, Product } from '../../models/product';
import { AuthService } from '../../services/auth.service'; // Assuming AuthService handles user login

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css'], // Assuming you have CSS for the cart
})
export class AddToCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  products: Product[] = []; // To store all products

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userId = this.authService.getUser()?.id || ''; // Get logged-in user ID from AuthService

    if (userId) {
      // Fetch cart items for the logged-in user
      this.productService
        .getCartItems(userId)
        .subscribe((items: CartItem[]) => {
          this.cartItems = items;
          this.fetchProducts(); // Fetch product details after getting cart items
        });
    }
  }

  // Fetch all products to display in the cart
  fetchProducts() {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  // Remove an item from the cart
  removeFromCart(productId: string) {
    const userId = this.authService.getUser()?.id || '';
    if (userId) {
      this.productService.removeFromCart(productId, userId).subscribe(() => {
        this.cartItems = this.cartItems.filter(
          (item) => item.productId !== productId
        );
      });
    }
  }

  // Fetch product details based on the productId from the list of products
  getProductDetails(productId: string): Product | undefined {
    return this.products.find((product) => product.id === productId);
  }
}
