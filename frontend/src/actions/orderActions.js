import {
  ADD_ORDER_FAIL,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ORDER_ALL_MY_FAIL,
  ORDER_ALL_MY_REQUEST,
  ORDER_ALL_MY_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from '../constants/orderConstants'

import axios from 'axios'
import { CART_RESET } from '../constants/cartConstants'

const addOrder = (newOrder) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_ORDER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/orders', newOrder, config)

    dispatch({ type: ADD_ORDER_SUCCESS, payload: data })
    dispatch({ type: CART_RESET, payload: data })
    localStorage.removeItem('cartItems')
  } catch (e) {
    dispatch({
      type: ADD_ORDER_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const getOrderDetails = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${orderId}`, config)

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (e) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const getAllMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_ALL_MY_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/myorders`, config)

    dispatch({ type: ORDER_ALL_MY_SUCCESS, payload: data })
  } catch (e) {
    dispatch({
      type: ORDER_ALL_MY_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

export { addOrder, getOrderDetails, getAllMyOrders }
