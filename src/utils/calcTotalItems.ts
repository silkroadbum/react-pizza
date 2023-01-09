import { CartItem } from '../redux/slices/cart/types';

export const calcTotalItems = (arr: CartItem[]) => {
  return arr.reduce((totalCount, item) => {
    return item.count + totalCount;
  }, 0);
};
