import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  name: string;
  price: number;
  isActive?: boolean;
  quantity: number;
  image?: {
    thumbnail: string;
    desktop: string;
    mobile: string;
    tablet: string;
  };
}

export interface State {
  cart: CartItem[];
  activeItems: CartItem[];
  openOrder: boolean;
}

interface CartActions {
  name: string;
  price: number;
}

export type Action =
  | { type: 'add/cart'; payload: CartItem }
  | { type: 'increment/item'; payload: { name: string; price: number } }
  | { type: 'decrement/item'; payload: { name: string; price: number } }
  | { type: 'active/item'; payload: { name: string; price: number } }
  | { type: 'open/item'; payload?: any }
  | { type: 'reset/item'; payload?: any }
  | { type: 'delete/item'; payload: { name: string; price: number } };

const initialState: State = {
  cart: [],
  activeItems: [],
  openOrder: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addCart(state, action: PayloadAction<{ name: string; price: number }>) {
      const checkItem = state.cart.some(
        (item) =>
          item.name === action.payload.name &&
          item.price === action.payload.price
      );
      if (checkItem) return;

      state.cart.push({
        ...action.payload,
        isActive: false,
        quantity: 1,
        image: {
          thumbnail: '',
          desktop: '',
          mobile: '',
          tablet: '',
        },
      });
    },

    incrementItem(state, action: PayloadAction<CartActions>) {
      state.cart = state.cart.map((item) =>
        item.name === action.payload.name && item.price === action.payload.price
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    },
    decrementItem(state, action: PayloadAction<CartActions>) {
      state.cart = state.cart.map((item) =>
        item.name === action.payload.name && item.price === action.payload.price
          ? {
              ...item,
              quantity: Math.max(item.quantity - 1, 1),
            }
          : item
      );
    },
    activeItem(state, action: PayloadAction<CartActions>) {
      state.cart = state.cart.map((item) =>
        item.name === action.payload.name && item.price === action.payload.price
          ? { ...item, isActive: !item.isActive }
          : item
      );
    },
    deleteItem(state, action: PayloadAction<CartActions>) {
      state.cart = state.cart.filter(
        (item) =>
          item.name !== action.payload.name ||
          item.price !== action.payload.price
      );
    },
    openOrderItem(state) {
      state.openOrder = !state.openOrder;
    },
    resetItem(state) {
      state.cart = [];
      state.activeItems = [];
      state.openOrder = false;
    },
  },
});

console.log(productSlice);

export const {
  addCart,
  incrementItem,
  decrementItem,
  activeItem,
  deleteItem,
  openOrderItem,
  resetItem,
} = productSlice.actions;

export default productSlice.reducer;
