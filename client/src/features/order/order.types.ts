export interface CheckoutInput {
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: "COD" | "Stripe";
  products: { product: string; quantity: number }[];
  totalPrice: number;
}

export interface ProductInOrder {
  _id: string;
  productName: string;
  price: number;
  images: string[];
}

export interface OrderItem {
  product: ProductInOrder;
  quantity: number;
}

export interface Order {
  _id: string;
  user: string;
  products: OrderItem[];
  status: "Pending" | "Shipped" | "Delivered";
  total: number;
  createdAt: string;
  updatedAt: string;
}
