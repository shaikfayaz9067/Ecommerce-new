import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, CartItem } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8081/api/products'; // Base API URL for products
  private cartUrl = 'http://localhost:8081/api/ecarts'; // Base API URL for cart

  constructor(private http: HttpClient) {}

  // Fetch all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Search products by query
  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search?q=${query}`);
  }

  // Add a product to the cart
  addToCart(
    productId: string,
    quantity: number,
    userId: string
  ): Observable<CartItem> {
    const cartData = { productId, quantity, userId };
    console.log('Sending cart data:', cartData);
    return this.http.post<CartItem>(this.cartUrl, cartData); // Updated to include quantity and userId
  }

  // Get all items in the cart
  getCartItems(userId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.cartUrl}?userId=${userId}`); // Fetch items based on userId
  }

  // Remove a product from the cart
  removeFromCart(productId: string, userId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.cartUrl}/${productId}?userId=${userId}`
    ); // Remove based on userId and productId
  }
}
