interface CartItem {
  name: string;
  price: number;
}

interface State {
  count: number;
  cart: CartItem[];
}

const initialState: State = {
  count: 0,
  cart: [],
};

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'add/count':
      return { ...state, count: state.count + 1 };

    case 'minus/count':
      return { ...state, count: Math.max(state.count - 1, 0) };
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
        cart: [...state.cart, action.payload],
      };

    default:
      return state;
  }
};

export const addCart = (name: string, price: number) => {
  return { type: 'add/cart', payload: { name, price } };
};

export const addCount = () => {
  return { type: 'add/count' };
};

export default cartReducer;