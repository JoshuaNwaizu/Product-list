import { createStore } from 'redux';
import cartReducer from './features/productsSlice';

const store = createStore(cartReducer);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
