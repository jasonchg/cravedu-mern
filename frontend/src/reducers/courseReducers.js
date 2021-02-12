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
  COURSE_REVIEW_REQUEST,
  COURSE_REVIEW_SUCCESS,
  COURSE_REVIEW_FAIL,
  COURSE_REVIEW_RESET,
  COURSE_CATEGORIES_REQUEST,
  COURSE_CATEGORIES_SUCCESS,
  COURSE_CATEGORIES_FAIL,
  COURSE_ANSWER_QANDA_REQUEST,
  COURSE_ANSWER_QANDA_SUCCESS,
  COURSE_ANSWER_QANDA_FAIL,
  COURSE_ANSWER_QANDA_RESET,
} from '../constants/courseConstants'
import {
  USER_WATCHED_CONTENT_FAIL,
  USER_WATCHED_CONTENT_REQUEST,
  USER_WATCHED_CONTENT_RESET,
  USER_WATCHED_CONTENT_SUCCESS,
} from '../constants/userConstants'

const courseListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case COURSE_LIST_REQUEST:
      return { loading: true, courses: [] }
    case COURSE_LIST_SUCCESS:
      return {
        loading: false,
        courses: action.payload.courses,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case COURSE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

const categoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case COURSE_CATEGORIES_REQUEST:
      return { loading: true, categories: [] }
    case COURSE_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      }
    case COURSE_CATEGORIES_FAIL:
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
    case COURSE_QANDA_REQUEST || COURSE_ANSWER_QANDA_REQUEST:
      return { loading: true }
    case COURSE_QANDA_SUCCESS || COURSE_ANSWER_QANDA_SUCCESS:
      return { loading: false, success: true }
    case COURSE_QANDA_FAIL || COURSE_ANSWER_QANDA_FAIL:
      return { loading: false, error: action.payload }
    case COURSE_QANDA_RESET || COURSE_ANSWER_QANDA_RESET:
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

const courseReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_REVIEW_REQUEST:
      return { loading: true }
    case COURSE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case COURSE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case COURSE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

const contentWatchedReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_WATCHED_CONTENT_REQUEST:
      return { loading: true }
    case USER_WATCHED_CONTENT_SUCCESS:
      return { loading: false, success: true }
    case USER_WATCHED_CONTENT_FAIL:
      return { loading: false, error: action.payload }
    case USER_WATCHED_CONTENT_RESET:
      return {}
    default:
      return state
  }
}

export {
  courseListReducer,
  courseDetailsReducer,
  courseQandaReducer,
  courseBestSoldReducer,
  courseReviewReducer,
  contentWatchedReducer,
  categoriesReducer,
}
