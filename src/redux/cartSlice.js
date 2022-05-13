import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    countProduct: 0,
    id: null,
    subtotal: 0,
    user: null,
    cartProducts: [],
  },
  reducers: {
    getCartByUser: (state, action) => {
      state.products = action.payload.cartProducts
        ? action.payload.cartProducts
        : [];
      state.cartProducts = action.payload.cartProducts;
      state.countProduct = action.payload.cartProducts
        ? action.payload.cartProducts.length
        : 0;
      state.id = action.payload.id;
      state.subtotal = action.payload.subtotal;
      state.user = action.payload.user;
      state.cartProducts = action.payload.cartProducts
        ? action.payload.cartProducts
        : [];
    },
    addToCart: (state, action) => {
      state.products = action.payload.cartProducts
        ? action.payload.cartProducts
        : [];
      state.countProduct = action.payload.cartProducts
        ? action.payload.cartProducts.length
        : 0;
      state.id = action.payload.id;
      state.subtotal = action.payload.subtotal;
      state.user = action.payload.user;
      state.cartProducts = action.payload.cartProducts
        ? action.payload.cartProducts
        : [];
    },
    removeToCart: (state, action) => {
      state.products = action.payload.cartProducts
        ? action.payload.cartProducts
        : [];
      state.countProduct = action.payload.cartProducts
        ? action.payload.cartProducts.length
        : 0;
      state.id = action.payload.id;
      state.subtotal = action.payload.subtotal;
      state.user = action.payload.user;
      state.cartProducts = action.payload.cartProducts
        ? action.payload.cartProducts
        : [];
    },
    destroy: (state) => {
      state.products = [];
      state.countProduct = 0;
      state.id = null;
      state.subtotal = 0;
      state.user = null;
      state.cartProducts = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { getCartByUser, addToCart, removeToCart } = cartSlice.actions;

export default cartSlice.reducer;
