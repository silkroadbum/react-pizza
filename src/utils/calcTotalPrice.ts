import { CartItem } from '../redux/slices/cart/types';

export const calcTotalPrice = (arr: CartItem[]) => {
  return arr.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
