// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import cropReducer from './slices/cropSlice.js';
import landReducer from './slices/landSlice.js';
import orderReducer from './slices/orderSlice.js';
import rentalReducer from './slices/rentalSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    crop: cropReducer,
    land: landReducer,
    order: orderReducer,
    rental: rentalReducer,
  },
});
export default store;