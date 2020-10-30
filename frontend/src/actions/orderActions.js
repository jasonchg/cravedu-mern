import {
  ADD_ORDER_FAIL,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
} from '../constants/orderConstants'

import axios from 'axios'

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

export { addOrder }
