import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 0,
  currentPage: 1,
  inputValue: '',
  searchValue: '',
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
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setFilters: (state, action) => {
      state.activeCategory = +action.payload.activeCategory;
      state.currentPage = +action.payload.currentPage;
      state.sortType = action.payload.sortType;
    },
  },
});

export const {
  setActiveCategory,
  setSortType,
  setCurrentPage,
  setInputValue,
  setSearchValue,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
