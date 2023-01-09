import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type SortType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

interface FilterSliceState {
  activeCategory: number;
  currentPage: number;
  inputValue: string;
  searchValue: string;
  sortType: SortType;
}

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

export const selectFilter = (state: RootState) => state.filter;
export const selectSortType = (state: RootState) => state.filter.sortType.name;

export const {
  setActiveCategory,
  setSortType,
  setCurrentPage,
  setInputValue,
  setSearchValue,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
