import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 0,
  currentPage: 1,
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setActiveCategory, setSortType, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
