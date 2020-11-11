import {
  ADMIN_USER_LIST_REQUEST,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_USER_LIST_FAIL,
  ADMIN_USER_LIST_RESET,
  ADMIN_USER_DELETE_REQUEST,
  ADMIN_USER_DELETE_SUCCESS,
  ADMIN_USER_DELETE_FAIL,
  ADMIN_USER_DETAILS_FAIL,
  ADMIN_USER_DETAILS_REQUEST,
  ADMIN_USER_DETAILS_SUCCESS,
  ADMIN_USER_DETAILS_RESET,
  ADMIN_USER_UPDATE_REQUEST,
  ADMIN_USER_UPDATE_SUCCESS,
  ADMIN_USER_UPDATE_FAIL,
  ADMIN_USER_UPDATE_RESET,
} from '../constants/adminConstants'

const adminUserListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_USER_LIST_REQUEST:
      return { loading: true, users: [] }
    case ADMIN_USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case ADMIN_USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case ADMIN_USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

const adminUserDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USER_DELETE_REQUEST:
      return { loading: true }
    case ADMIN_USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ADMIN_USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

const adminUserGetDetailsReducer = (state = { userDetails: {} }, action) => {
  switch (action.type) {
    case ADMIN_USER_DETAILS_REQUEST:
      return { loading: true }
    case ADMIN_USER_DETAILS_SUCCESS:
      return { loading: false, userDetails: action.payload }
    case ADMIN_USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case ADMIN_USER_DETAILS_RESET:
      return { userDetails: {} }
    default:
      return state
  }
}

const adminUserUpdateReducer = (state = { userDetails: {} }, action) => {
  switch (action.type) {
    case ADMIN_USER_UPDATE_REQUEST:
      return { loading: true }
    case ADMIN_USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case ADMIN_USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case ADMIN_USER_UPDATE_RESET:
      return { userDetails: {} }
    default:
      return state
  }
}

export {
  adminUserListReducer,
  adminUserDeleteReducer,
  adminUserGetDetailsReducer,
  adminUserUpdateReducer,
}
