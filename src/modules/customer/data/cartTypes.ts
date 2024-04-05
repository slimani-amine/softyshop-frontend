export interface ItemType {
  availability: boolean;
  brand: { id: number; name: string };
  category: { id: number; name: string };
  creator: { id: number; name: string };
  id: number;
  isPublished: boolean;
  name: string;
  price: number;
  publishedAt: string;
  reviews: string[];
  stockNumber: number;
  store: { id: number; name: string };
}
export interface StateType {
  cartId: number;
  cart: ItemType[];
  cartItems: number;
  cartAmount: number;
  cartQuantity: number;
  error: any;
  status: string;
}
export interface addToCartPayload {
  quantity: number;
  productId: number;
}
