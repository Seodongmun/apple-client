import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice2";

const store = configureStore({
  reducer: {
    count: cartSlice.reducer,
  },
});

export default store;
