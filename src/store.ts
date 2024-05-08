import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import { productsApi } from "./services/products";
import { productApi } from "./services/product";
import filterReducer from "./slices/filterSlice";
import sidebarReducer from "./slices/sidebarSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    filters: filterReducer,
    sidebar: sidebarReducer,
    userState: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      productApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ReduxStore = {
  getState: () => RootState;
  dispatch: AppDispatch;
};
