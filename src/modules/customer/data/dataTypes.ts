export interface initialStateProductType {
  products: ProductType[];
}

export interface ProductType {
  availability: boolean;
  discount: number;
  id: number;
  images: string;
  initialPrice: number;
  isPublished: boolean;
  name: string;
  price: number;
  publishedAt: string;
  similar: boolean;
  stockNumber: number;
  updatedAt: string;
  quantity: number;
}

export interface CartItemType {
  availability: boolean;
  brand: { id: number; name: string };
  category: { id: number; name: string };
  creator: { id: number; name: string };
  id: number;
  isPublished: boolean;
  name: string;
  price: number;
  publishedAt: string;
  quantity: number;
  product: ProductType;
  reviews: string[];
  stockNumber: number;
  store: { id: number; name: string };
}
export interface initialStateCartType {
  cartId: number;
  cart: CartItemType[];
  cartItems: number;
  cartAmount: number;
  cartQuantity: number;
  error: any;
  status: string;
}
export interface addToCartPayload {
  quantity: number;
  productId: string;
}