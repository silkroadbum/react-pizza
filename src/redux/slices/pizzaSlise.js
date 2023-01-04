import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { category, sortName, order, search, currentPage } = params;
  const { data } = await axios.get(
    `https://63ac4a95da81ba97617fdf18.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortName}&order=${order}${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: '', // loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const { setItems, setIsLoadnig } = pizzaSlice.actions;

export default pizzaSlice.reducer;
