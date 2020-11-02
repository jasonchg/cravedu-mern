import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  courseListReducer,
  courseDetailsReducer,
} from './reducers/courseReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  userCourseReducer,
} from './reducers/userReducers'
import { cartReducers } from './reducers/cartReducers'
import {
  addOrderReducer,
  getOrderReducer,
  getAllMyOrdersReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
  courseList: courseListReducer,
  courseDetails: courseDetailsReducer,
  cart: cartReducers,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateReducer,
  userCourses: userCourseReducer,
  orderAdd: addOrderReducer,
  orderDetails: getOrderReducer,
  orderAllMy: getAllMyOrdersReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
