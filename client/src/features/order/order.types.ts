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
