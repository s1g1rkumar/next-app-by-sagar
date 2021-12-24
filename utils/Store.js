import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();
const initialState = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  cart: {
    cartItems:Cookies.get('cartItems')? JSON.parse(Cookies.get('cartItems')): [],
  },
};
// console.log("get cookesid",JSON.parse(Cookies.get('cartItems')));
// console.log("cafdglfh",Cookies.get('cartItems'));
// console.log("cartvfgdghyu",initialState.cart);

function reducer(state, action) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };

    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };

    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const exitItem = state.cart.cartItems.find((item) => item._id === newItem._id);
          
     
      const cartItems = exitItem
        ? state.cart.cartItems.map((item) =>
            item._id === exitItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cartItems',JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
