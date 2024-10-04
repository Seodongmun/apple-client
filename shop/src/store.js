import { configureStore } from "@reduxjs/toolkit";
import cart from "./store/cartSlice.js";
import product from "./store/productSlice.js";

export default configureStore({
  reducer: {
    cart: cart.reducer,
    product: product.reducer,
  },
});
