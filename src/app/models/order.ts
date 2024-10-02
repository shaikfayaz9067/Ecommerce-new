import { Address } from './address';

export interface Order {
  id?: string; // Optional, will be assigned by the backend
  userId: string; // Reference to the User placing the order
  items: OrderItem[]; // List of products in the order
  totalAmount: number; // Total cost of the order
  status: string; // Order status ('pending', 'shipped', 'delivered', etc.)
  shippingAddress: Address;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}
