import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  courseListReducer,
  courseDetailsReducer,
  courseQandaReducer,
  courseBestSoldReducer,
  courseReviewReducer,
  contentWatchedReducer,
  categoriesReducer,
} from './reducers/courseReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  userCourseReducer,
  userUpdateContentReducer,
} from './reducers/userReducers'
import { cartReducers } from './reducers/cartReducers'
import {
  addOrderReducer,
  getOrderReducer,
  getAllMyOrdersReducer,
} from './reducers/orderReducers'
import {
  adminUserDeleteReducer,
  adminUserListReducer,
  adminUserGetDetailsReducer,
  adminUserUpdateReducer,
} from './reducers/adminReducers'
import {
  adminCourseDetailsReducer,
  adminCourseListReducer,
  adminCourseUpdateReducer,
} from './reducers/adminCourseReducers'
import {
  instructorContentDeleteReducer,
  instructorContentCreateReducer,
  instructorContentUpdateReducer,
  instructorCourseCreateReducer,
  instructorCourseDeleteReducer,
  instructorCourseDetailsReducer,
  instructorCourseListReducer,
  instructorCourseUpdateReducer,
  instructorContentUpdateQuizReducer,
} from './reducers/instructorReducers'
import {
  notificationDeleteReducer,
  notificationGrantAsnwerReducer,
  notificationReadReducer,
  userNotificationReducer,
} from './reducers/notificationReducers'

const reducer = combineReducers({
  adminCourseUpdate: adminCourseUpdateReducer,
  adminCourseDetails: adminCourseDetailsReducer,
  adminCourseList: adminCourseListReducer,
  adminUserUpdateDetails: adminUserUpdateReducer,
  adminUserGetDetails: adminUserGetDetailsReducer,
  adminUserDelete: adminUserDeleteReducer,
  adminUserList: adminUserListReducer,
  instructorContentQuizUpdate: instructorContentUpdateQuizReducer,
  instructorContentDelete: instructorContentDeleteReducer,
  instructorCourseDelete: instructorCourseDeleteReducer,
  instructorContentUpdate: instructorContentUpdateReducer,
  instructorContentCreate: instructorContentCreateReducer,
  instructorCourseUpdate: instructorCourseUpdateReducer,
  instructorCourseDetails: instructorCourseDetailsReducer,
  instructorCourseList: instructorCourseListReducer,
  instructorCourseCreate: instructorCourseCreateReducer,
  contentWatched: contentWatchedReducer,
  courseReview: courseReviewReducer,
  courseBestSold: courseBestSoldReducer,
  categoryList: categoriesReducer,
  courseList: courseListReducer,
  courseDetails: courseDetailsReducer,
  courseQanda: courseQandaReducer,
  cart: cartReducers,
  instructorGrantAsnwer: notificationGrantAsnwerReducer,
  userNotificationDelete: notificationDeleteReducer,
  userNotificationRead: notificationReadReducer,
  userNotifications: userNotificationReducer,
  userLogin: userLoginReducer,
  userUpdateContent: userUpdateContentReducer,
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

const userLearnFromStorage = localStorage.getItem('userLearn')
  ? JSON.parse(localStorage.getItem('userLearn'))
  : null

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
  userCourses: { currentVideo: userLearnFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
