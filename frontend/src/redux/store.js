import { configureStore } from '@reduxjs/toolkit';
import productTypesSlice from './slices/productTypesSlice';
import cartSlice from './slices/cartSlice';

const store = configureStore({
  reducer: {
    productTypes: productTypesSlice,
    cart: cartSlice
  }
});

export default store;
