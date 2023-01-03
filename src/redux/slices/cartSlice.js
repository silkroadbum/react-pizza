import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  countPizzas: 0,
};

const totalPrice = (arr) => {
  return arr.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};

const totalItems = (arr) => {
  return arr.reduce((totalCount, item) => {
    return item.count + totalCount;
  }, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
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
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => Number(item.id) !== Number(action.payload));
      state.totalPrice = totalPrice(state.items);
      state.countPizzas = totalItems(state.items);
    },
    minusItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      findItem.count--;
      state.totalPrice = totalPrice(state.items);
      state.countPizzas = totalItems(state.items);
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
