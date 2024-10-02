export interface Product {
  id: string;
  category: {
    id: string;
    name: string;
    weight: number;
  };
  quantity: number;
  price: number;
  totalPrice: number;
  image: string;
  subcategory: {
    name: string;
    subname: string; // This field was missing in the previous examples
    price: number;
  };
}

export interface CartItem {
  productId: string; // Only store the ID
  quantity: number; // Keep track of quantity in the cart
  userId: string;
}
