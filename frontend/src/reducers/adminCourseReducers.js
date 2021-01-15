import {
  ADMIN_COURSE_DETAILS_FAIL,
  ADMIN_COURSE_DETAILS_REQUEST,
  ADMIN_COURSE_DETAILS_RESET,
  ADMIN_COURSE_DETAILS_SUCCESS,
  ADMIN_COURSE_LIST_FAIL,
  ADMIN_COURSE_LIST_REQUEST,
  ADMIN_COURSE_LIST_RESET,
  ADMIN_COURSE_LIST_SUCCESS,
  ADMIN_COURSE_UPDATE_FAIL,
  ADMIN_COURSE_UPDATE_REQUEST,
  ADMIN_COURSE_UPDATE_RESET,
  ADMIN_COURSE_UPDATE_SUCCESS,
} from '../constants/adminConstants'

const adminCourseListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case ADMIN_COURSE_LIST_REQUEST:
      return { loading: true, courses: [] }
    case ADMIN_COURSE_LIST_SUCCESS:
      return {
        loading: false,
        courses: action.payload.courses,
        page: action.payload.page,
        pages: action.payload.pages,
      }
    case ADMIN_COURSE_LIST_FAIL:
      return { loading: false, error: action.payload }
    case ADMIN_COURSE_LIST_RESET:
      return { courses: [] }
    default:
      return state
  }
}

const adminCourseDetailsReducer = (state = { courseDetails: {} }, action) => {
  switch (action.type) {
    case ADMIN_COURSE_DETAILS_REQUEST:
      return { loading: true }
    case ADMIN_COURSE_DETAILS_SUCCESS:
      return { loading: false, courseDetails: action.payload }
    case ADMIN_COURSE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case ADMIN_COURSE_DETAILS_RESET:
      return { coursesDetails: {} }
    default:
      return state
  }
}

const adminCourseUpdateReducer = (state = { courseDetails: {} }, action) => {
  switch (action.type) {
    case ADMIN_COURSE_UPDATE_REQUEST:
      return { loading: true }
    case ADMIN_COURSE_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case ADMIN_COURSE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case ADMIN_COURSE_UPDATE_RESET:
      return { courseDetails: {} }
    default:
      return state
  }
}

export {
  adminCourseListReducer,
  adminCourseDetailsReducer,
  adminCourseUpdateReducer,
}
