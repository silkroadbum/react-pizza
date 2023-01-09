import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  type: string;
  count: number;
  price: number;
  size: number;
};

interface CartSliceState {
  totalPrice: number;
  countPizzas: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
  countPizzas: 0,
};

const totalPrice = (arr: CartItem[]) => {
  return arr.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};

const totalItems = (arr: CartItem[]) => {
  return arr.reduce((totalCount, item) => {
    return item.count + totalCount;
  }, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = totalPrice(state.items);
      state.countPizzas = totalItems(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => Number(item.id) !== Number(action.payload));
      state.totalPrice = totalPrice(state.items);
      state.countPizzas = totalItems(state.items);
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem && findItem.count > 1) {
        findItem.count--;
        state.totalPrice = totalPrice(state.items);
        state.countPizzas = totalItems(state.items);
      }
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.countPizzas = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
