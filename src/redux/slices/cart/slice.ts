import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalItems } from '../../../utils/calcTotalItems';
import { calcTotalPrice } from '../../../utils/calcTotalPrice';
import { getCartFromLS } from '../../../utils/getCartFronLS';
import { CartItem, CartSliceState } from './types';

const { items, totalPrice, totalItems } = getCartFromLS();

const initialState: CartSliceState = {
  items,
  totalPrice,
  countPizzas: totalItems,
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
      state.totalPrice = calcTotalPrice(state.items);
      state.countPizzas = calcTotalItems(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => Number(item.id) !== Number(action.payload));
      state.totalPrice = calcTotalPrice(state.items);
      state.countPizzas = calcTotalItems(state.items);
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem && findItem.count > 1) {
        findItem.count--;
        state.totalPrice = calcTotalPrice(state.items);
        state.countPizzas = calcTotalItems(state.items);
      }
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.countPizzas = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
