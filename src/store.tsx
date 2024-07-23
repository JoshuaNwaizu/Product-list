// import cartReducer from './features/productsSlice';
import productsSlice from './features/productsSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: productsSlice,
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
