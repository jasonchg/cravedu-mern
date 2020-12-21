import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
  SAVE_PAYMENT_METHODS,
} from '../constants/cartConstants'

const addToCart = (slug) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/courses/${slug}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      course: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      instructor: data.instructor,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

const removeFromCart = (courseId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: courseId,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

const savePaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({
    type: SAVE_PAYMENT_METHODS,
    payload: paymentMethod,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
}

const clearCart = () => (dispatch) => {
  dispatch({ type: CART_RESET })
  localStorage.removeItem('cartItems')
}

export { addToCart, removeFromCart, savePaymentMethod, clearCart }
