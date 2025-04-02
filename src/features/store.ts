import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './products/productsSlice';
import cartReducer from './cart/cartSlice';
import authReducer from './auth/authSlice';
import likedProductsReducer from './likedProducts/likedProductsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    likedProducts: likedProductsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 