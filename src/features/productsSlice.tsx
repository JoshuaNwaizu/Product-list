export interface CartItem {
  name: string;
  price: number;
  isActive: boolean;
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
interface OpenAction {
  type: 'open/item';
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

const cartReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'add/cart':
      const checkItem = state.cart.some(
        (item) =>
          item.name === action.payload.name &&
          item.price === action.payload.price
      );
      if (checkItem) {
        return state;
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, isActive: false }],
      };
    case 'increment/item':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.name === action.payload.name &&
          item.price === action.payload.price
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        ),
      };
    case 'decrement/item':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.name === action.payload.name &&
          item.price === action.payload.price
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        ),
      };
    case 'active/item':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.name === action.payload.name &&
          item.price === action.payload.price
            ? { ...item, isActive: !item.isActive }
            : item
        ),
      };
    case 'delete/item':
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            item.name !== action.payload.name ||
            item.price !== action.payload.price
        ),
      };

    case 'open/item':
      return { ...state, openOrder: !state.openOrder };
    case 'reset/item':
      return { ...state, cart: [], activeItems: [], openOrder: false };

    default:
      return state;
  }
};

export const addCart = (name: string, price: number): Action => {
  return {
    type: 'add/cart',
    payload: { name, price, quantity: 1, isActive: false },
  };
};

export const incrementItemQuantity = (name: string, price: number): Action => ({
  type: 'increment/item',
  payload: { name, price },
});

export const decrementItemQuantity = (name: string, price: number): Action => ({
  type: 'decrement/item',
  payload: { name, price },
});

export const checkForActive = (name: string, price: number): Action => ({
  type: 'active/item',
  payload: { name, price },
});
export const deleteItem = (name: string, price: number): Action => ({
  type: 'delete/item',
  payload: { name, price },
});

export const openOrder = (): OpenAction => {
  return {
    type: 'open/item',
  };
};

export default cartReducer;
