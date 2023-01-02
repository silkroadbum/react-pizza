import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 0,
  sortType: {
    name: 'популярности (убыв.)',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const { setActiveCategory } = filterSlice.actions;

export default filterSlice.reducer;
