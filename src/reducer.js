import { INCREASE, DECREASE, CLEAR_CART, GET_TOTALS, REMOVE } from "./actions"

import cartItems from "./cart-items";

const initial_store = {
    cart: cartItems,
    total: 0,
    amount: 0
};

export const reducer = (state = initial_store, action) => {

    console.log({ state, action });
    switch (action.type) {
        case CLEAR_CART:
            return {
                ...state,
                cart: []
            }
        case DECREASE:
            let tempCartD = []
            if (action.payload.amount === 1) {
                tempCartD = state.cart.filter(item => item.id !== action.payload.id)
            } else {
                tempCartD = state.cart.map(item => item.id === action.payload.id ? { ...item, amount: item.amount - 1 } : item)
            }
            return {
                ...state,
                cart: tempCartD
            }


        case INCREASE:
            let tempCart = state.cart.map(item => item.id === action.payload.id ? { ...item, amount: item.amount + 1 } : item)
            return {
                ...state,
                cart: tempCart
            }

        case REMOVE:
            return {
                ...state,
                cart: state.cart.filter(c => c.id !== action.payload.id)
            }
        case GET_TOTALS:
            let total = 0;
            state.cart.forEach(item => total += item.amount * item.price)
            let amount = 0;
            state.cart.forEach(item => amount += item.amount)
            return {
                ...state,
                total: total.toFixed(2),
                amount
            }
        default:
            return state;

    }

}