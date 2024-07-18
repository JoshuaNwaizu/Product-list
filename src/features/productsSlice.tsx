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
      return {
        ...state,
        cart: [
          ...state.cart,
          { name: action.payload.name, price: action.payload.price },
        ],
      };

    default:
      return state;
  }
};

export const addCart = (name: string, price: number) => {
  return { type: 'add/cart', payload: { name, price } };
};

export default cartReducer;
