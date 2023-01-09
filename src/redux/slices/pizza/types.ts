export type PizzaItem = {
  category: number;
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

export type SearchPizzaParams = {
  category: string;
  sortName: string;
  order: string;
  search: string;
  currentPage: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliseState {
  status: Status;
  items: PizzaItem[];
}
