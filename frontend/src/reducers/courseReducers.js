import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  COURSE_QANDA_REQUEST,
  COURSE_QANDA_SUCCESS,
  COURSE_QANDA_FAIL,
  COURSE_QANDA_RESET,
  COURSE_BEST_REQUEST,
  COURSE_BEST_SUCCESS,
  COURSE_BEST_FAIL,
} from '../constants/courseConstants'

const courseListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case COURSE_LIST_REQUEST:
      return { loading: true, courses: [] }
    case COURSE_LIST_SUCCESS:
      return { loading: false, courses: action.payload }
    case COURSE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

const courseDetailsReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return { loading: true }
    case COURSE_DETAILS_SUCCESS:
      return { loading: false, course: action.payload }
    case COURSE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

const courseQandaReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_QANDA_REQUEST:
      return { loading: true }
    case COURSE_QANDA_SUCCESS:
      return { loading: false, success: true }
    case COURSE_QANDA_FAIL:
      return { loading: false, error: action.payload }
    case COURSE_QANDA_RESET:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

const courseBestSoldReducer = (state = { courses: {} }, action) => {
  switch (action.type) {
    case COURSE_BEST_REQUEST:
      return { loading: true }
    case COURSE_BEST_SUCCESS:
      return { loading: false, courses: action.payload }
    case COURSE_BEST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export {
  courseListReducer,
  courseDetailsReducer,
  courseQandaReducer,
  courseBestSoldReducer,
}
