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
