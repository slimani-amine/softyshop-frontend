export interface addressType {
  address: string;
  phoneNumber: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface userType {
  role: string;
  cart: { id: number };
  confirmation_token: any;
  confirmed_email: boolean;
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  isVerified: boolean;
  phoneNumber: string;
}

export interface initialStateProductType {
  products: ProductType[];
}

export interface ProductType {
  availability: boolean;
  discount: number;
  id: number;
  image: string;
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
  token: any;
}
export interface addToCartPayload {
  quantity: number;
  productId: string;
}
