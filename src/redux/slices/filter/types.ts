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

export interface FilterSliceState {
  activeCategory: number;
  currentPage: number;
  inputValue: string;
  searchValue: string;
  sortType: SortType;
}
