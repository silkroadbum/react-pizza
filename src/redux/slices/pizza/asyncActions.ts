import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzaItem, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: SearchPizzaParams) => {
    const { category, sortName, order, search, currentPage } = params;
    const { data } = await axios.get(
      `https://63ac4a95da81ba97617fdf18.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortName}&order=${order}${search}`,
    );
    return data as PizzaItem[];
  },
);
