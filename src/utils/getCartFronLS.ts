import { calcTotalItems } from "./calcTotalItems";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);
    const totalItems = calcTotalItems(items);
    
    return {
        items,
        totalPrice,
        totalItems
    }
}