import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
});
