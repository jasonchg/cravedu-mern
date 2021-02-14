import {
  NOTIFICATION_DELETE_FAIL,
  NOTIFICATION_DELETE_REQUEST,
  NOTIFICATION_DELETE_RESET,
  NOTIFICATION_DELETE_SUCCESS,
  NOTIFICATION_GRANT_ANSWER_FAIL,
  NOTIFICATION_GRANT_ANSWER_REQUEST,
  NOTIFICATION_GRANT_ANSWER_RESET,
  NOTIFICATION_GRANT_ANSWER_SUCCESS,
  NOTIFICATION_READ_FAIL,
  NOTIFICATION_READ_REQUEST,
  NOTIFICATION_READ_RESET,
  NOTIFICATION_READ_SUCCESS,
  USER_NOTIFICATION_FAIL,
  USER_NOTIFICATION_REQUEST,
  USER_NOTIFICATION_RESET,
  USER_NOTIFICATION_SUCCESS,
} from '../constants/notificationConstants'

const userNotificationReducer = (state = { notifications: [] }, action) => {
  switch (action.type) {
    case USER_NOTIFICATION_REQUEST:
      return { loading: true }
    case USER_NOTIFICATION_SUCCESS:
      return { loading: false, notifications: action.payload }
    case USER_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload }
    case USER_NOTIFICATION_RESET:
      return { notifications: [] }
    default:
      return state
  }
}

const notificationReadReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTIFICATION_READ_REQUEST:
      return { loading: true }
    case NOTIFICATION_READ_SUCCESS:
      return { loading: false, success: true }
    case NOTIFICATION_READ_FAIL:
      return { loading: false, error: action.payload }
    case NOTIFICATION_READ_RESET:
      return {}
    default:
      return state
  }
}

const notificationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTIFICATION_DELETE_REQUEST:
      return { loading: true }
    case NOTIFICATION_DELETE_SUCCESS:
      return { loading: false, success: true }
    case NOTIFICATION_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case NOTIFICATION_DELETE_RESET:
      return {}
    default:
      return state
  }
}

const notificationGrantAsnwerReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTIFICATION_GRANT_ANSWER_REQUEST:
      return { loading: true }
    case NOTIFICATION_GRANT_ANSWER_SUCCESS:
      return { loading: false, success: true }
    case NOTIFICATION_GRANT_ANSWER_FAIL:
      return { loading: false, error: action.payload }
    case NOTIFICATION_GRANT_ANSWER_RESET:
      return {}
    default:
      return state
  }
}

export {
  userNotificationReducer,
  notificationReadReducer,
  notificationDeleteReducer,
  notificationGrantAsnwerReducer,
}
