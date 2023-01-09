import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterSliceState, SortPropertyEnum, SortType } from './types';

const initialState: FilterSliceState = {
  activeCategory: 0,
  currentPage: 1,
  inputValue: '',
  searchValue: '',
  sortType: {
    name: 'популярности (убыв.)',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<number>) => {
      state.activeCategory = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
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
