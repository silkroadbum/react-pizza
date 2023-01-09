export type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  type: string;
  count: number;
  price: number;
  size: number;
};

export interface CartSliceState {
  totalPrice: number;
  countPizzas: number;
  items: CartItem[];
}
