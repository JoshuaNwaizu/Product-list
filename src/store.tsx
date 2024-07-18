import { createStore } from 'redux';
import cartReducer from './features/productsSlice';

const store = createStore(cartReducer);
// store.dispatch(addCart('Fruit salad', 2.3));

export default store;
