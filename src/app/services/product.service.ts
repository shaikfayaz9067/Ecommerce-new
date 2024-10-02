import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product'; // Your product data type

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8081/api/eproducts'; // Base API URL for products
  private cartUrl = 'http://localhost:8081/api/cart'; // Base API URL for cart

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
  addToCart(productId: string): Observable<any> {
    return this.http.post(this.cartUrl, { productId });
  }

  // Get all items in the cart
  getCartItems(): Observable<any> {
    return this.http.get(this.cartUrl);
  }

  // Remove a product from the cart
  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.cartUrl}/${productId}`);
  }
}
