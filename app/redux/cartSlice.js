/*import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const CART_STORAGE_KEY = "cart";

// Load the cart from local storage, if it exists
const storedCartItems = localStorage.getItem(CART_STORAGE_KEY);
if (storedCartItems) {
    initialState.cartItems = JSON.parse(storedCartItems);
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increment: (state, action) => {
            const cartItem = state.cartItems.find(
                (el) => el.product.id === action.payload.id
            );
            if (cartItem) cartItem.qty++;
            else {
                state.cartItems.push({
                    product: action.payload,
                    qty: 1,
                });
            }
        },

        decrement: (state, action) => {
            const cartItem = state.cartItems.find(
                (el) => el.product.id === action.payload.id
            );
            if (cartItem) {
                cartItem.qty--;
                if (cartItem.qty === 0) {
                    state.cartItems = state.cartItems.filter(
                        (el) => el.product.id !== action.payload.id
                    );
                }
            }
        },
    },
});

// Save the cart to local storage whenever it is updated
export const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
};

// Selectors
const cartItems = (state) => state.cart.cartItems;

export const productQtyInCartSelector = createSelector(
    [cartItems, (cartItems, productId) => productId],
    (cartItems, productId) =>
        cartItems.find((el) => el.product.id === productId)?.qty
);

export const totalCartItemsSelector = createSelector(
    [cartItems],
    (cartItems) =>
        cartItems.reduce((total, curr) => (total += curr.qty), 0)
);

export const TotalPriceSelector = createSelector(
    [cartItems],
    (cartItems) =>
        cartItems.reduce(
            (total, curr) => (total += curr.qty * curr.product.price),
            0
        )
);

export const { increment, decrement } = cartSlice.actions;

// Define a thunk action to handle persisting the cart to local storage
export const persistCart = () => (dispatch, getState) => {
    const { cartItems } = getState().cart;
    saveCartToLocalStorage(cartItems);
};

// Add a listener to the store to persist the cart to local storage
export const addCartListener = (store) => {
    store.subscribe(() => {
        store.dispatch(persistCart());
    });
};

export default cartSlice.reducer;*/

/*import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const CART_STORAGE_KEY = "cart";

// Load the cart from local storage, if it exists
const storedCartItems = localStorage.getItem(CART_STORAGE_KEY);
if (storedCartItems) {
    initialState.cartItems = JSON.parse(storedCartItems);
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increment: (state, action) => {
            const cartItem = state.cartItems.find(
                (el) => el.product.id === action.payload.id
            );
            if (cartItem) cartItem.qty++;
            else {
                state.cartItems.push({
                    product: action.payload,
                    qty: 1,
                });
            }
        },

        decrement: (state, action) => {
            const cartItem = state.cartItems.find(
                (el) => el.product.id === action.payload.id
            );
            if (cartItem) {
                cartItem.qty--;
                if (cartItem.qty === 0) {
                    state.cartItems = state.cartItems.filter(
                        (el) => el.product.id !== action.payload.id
                    );
                }
            }
        },
    },
});

// Save the cart to local storage whenever it is updated
export const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
};

// Selectors

const cartItems = (state) => state.cart.cartItems;

export const productQtyInCartSelector = createSelector(
    [cartItems, (cartItems, productId) => productId],
    (cartItems, productId) =>
        cartItems.find((el) => el.product.id === productId)?.qty
);

export const totalCartItemsSelector = createSelector(
    [cartItems],
    (cartItems) =>
        cartItems.reduce(
            (total, curr) => (total += curr.qty),
            0
        )
);

export const TotalPriceSelector = createSelector(
    [cartItems],
    (cartItems) =>
        cartItems.reduce(
            (total, curr) => (total += curr.qty * curr.product.price),
            0
        )
);

export const { increment, decrement } = cartSlice.actions;

// Define a thunk action to handle persisting the cart to local storage
export const persistCart = () => (dispatch, getState) => {
    const { cartItems } = getState().cart;
    saveCartToLocalStorage(cartItems);
};

export default cartSlice.reducer;*/

import { createSelector, createSlice } from "@reduxjs/toolkit";

/*const initialState = loadCartState() ?? {
    cartItems: [],
};*/
const initialState = {
    cartItems: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increment: (state, action) => {
            const cartItem = state.cartItems.find(
                (el) => el.product.id === action.payload.id
            );
            if (cartItem) /*cartItem.qty++;*/;
            else {
                state.cartItems.push({
                    product: action.payload,
                    qty: 1,
                });
            }
        },

        decrement: (state, action) => {
            const cartItem = state.cartItems.find(
                (el) => el.product.id === action.payload.id
            );
            if (cartItem) {
                cartItem.qty--;
                if (cartItem.qty === 0) {
                    state.cartItems = state.cartItems.filter(
                        (el) => el.product.id !== action.payload.id
                    );
                }
            }
        },
    },
});

const cartItems = (state) => state.cart.cartItems;

export const productQtyInCartSelector = createSelector(
    [cartItems, (cartItems, productId) => productId],
    (cartItems, productId) =>
        cartItems.find((el) => el.product.id === productId)?.qty
);

export const totalCartItemsSelector = createSelector(
    [cartItems],
    (cartItems) =>
        cartItems.reduce(
            (total, curr) => (total += curr.qty),
            0
        )
);

export const TotalPriceSelector = createSelector(
    [cartItems],
    (cartItems) =>
        cartItems.reduce(
            (total, curr) => (total += curr.qty * curr.product.price),
            0
        )
);

export const updateCart = (cart) => {
    return {
        type: 'cart/updateCart',
        payload: cart,
    };
};


export const { increment, decrement } = cartSlice.actions;

/*export const saveCartState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cartState', serializedState);
    } catch {
        // Ignore write errors
    }
};

export const loadCartState = () => {
    try {
        const serializedState = localStorage.getItem('cartState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};*/

// export const { saveCartState } = cartSlice.actions;

export default cartSlice.reducer;
