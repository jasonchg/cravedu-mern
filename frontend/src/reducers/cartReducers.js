import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
  SAVE_PAYMENT_METHODS,
} from '../constants/cartConstants'

const cartReducers = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.course === item.course)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.course === existItem.course ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.course !== action.payload),
      }
    case CART_RESET:
      return {
        ...state,
        cartItems: [],
      }

    case SAVE_PAYMENT_METHODS:
      return {
        ...state,
        paymentMethods: action.payload,
      }

    default:
      return state
  }
}

export { cartReducers }
