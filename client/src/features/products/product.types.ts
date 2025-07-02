export interface Product {
  _id: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  seller: string;
  rating: number;
  numreviews: number;
}

export interface UpdateProductInput {
  productName?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  images?: string[];
}
