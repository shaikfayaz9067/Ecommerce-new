import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: 'addtocart.component.html',
})
export class AddToCartComponent {
  cartItems: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  removeFromCart(productId: string) {
    this.productService.removeFromCart(productId).subscribe(() => {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    });
  }
}
