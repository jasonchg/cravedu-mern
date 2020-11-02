import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_ALL_REQUEST,
  ORDER_ALL_SUCCESS,
  ORDER_ALL_FAIL,
  ORDER_ALL_MY_REQUEST,
  ORDER_ALL_MY_SUCCESS,
  ORDER_ALL_MY_FAIL,
  ORDER_ALL_MY_RESET,
} from '../constants/orderConstants'

const addOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ORDER_REQUEST:
      return { loading: true }
    case ADD_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ADD_ORDER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

const getOrderReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true }
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

const getAllOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_ALL_REQUEST:
      return { loading: true }
    case ORDER_ALL_SUCCESS:
      return { loading: false, orders: action.payload }
    case ORDER_ALL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

const getAllMyOrdersReducer = (state = { myOrders: [] }, action) => {
  switch (action.type) {
    case ORDER_ALL_MY_REQUEST:
      return { loading: true }
    case ORDER_ALL_MY_SUCCESS:
      return { loading: false, myOrders: action.payload }
    case ORDER_ALL_MY_FAIL:
      return { loading: false, myOrders: action.payload }

    case ORDER_ALL_MY_RESET:
      return { myOrders: [] }
    default:
      return state
  }
}

export {
  addOrderReducer,
  getOrderReducer,
  getAllOrdersReducer,
  getAllMyOrdersReducer,
}
