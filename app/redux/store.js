/*
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const cartMiddleware = getDefaultMiddleware({
    serializableCheck: false,
});

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    middleware: [...cartMiddleware],
});

// Save the cart to local storage whenever it is updated
store.subscribe(() => {
    const { cartItems } = store.getState().cart;
    localStorage.setItem("cart", JSON.stringify(cartItems));
});

export default store;
*/

import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"

export default configureStore({
    reducer: {
        cart: cartReducer,
    }
})
