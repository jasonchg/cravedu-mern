import {
  INSTRUCTOR_COURSE_DETAILS_FAIL,
  INSTRUCTOR_COURSE_DETAILS_REQUEST,
  INSTRUCTOR_COURSE_DETAILS_RESET,
  INSTRUCTOR_COURSE_DETAILS_SUCCESS,
  INSTRUCTOR_COURSE_LIST_FAIL,
  INSTRUCTOR_COURSE_LIST_REQUEST,
  INSTRUCTOR_COURSE_LIST_RESET,
  INSTRUCTOR_COURSE_LIST_SUCCESS,
  INSTRUCTOR_COURSE_UPDATE_FAIL,
  INSTRUCTOR_COURSE_UPDATE_REQUEST,
  INSTRUCTOR_COURSE_UPDATE_RESET,
  INSTRUCTOR_COURSE_UPDATE_SUCCESS,
  INSTRUCTOR_COURSE_CREATE_REQUEST,
  INSTRUCTOR_COURSE_CREATE_FAIL,
  INSTRUCTOR_COURSE_CREATE_SUCCESS,
  INSTRUCTOR_COURSE_CREATE_RESET,
} from '../constants/instructorConstants'

const instructorCourseListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case INSTRUCTOR_COURSE_LIST_REQUEST:
      return { loading: true, courses: [] }
    case INSTRUCTOR_COURSE_LIST_SUCCESS:
      return { loading: false, courses: action.payload }
    case INSTRUCTOR_COURSE_LIST_FAIL:
      return { loading: false, error: action.payload }
    case INSTRUCTOR_COURSE_LIST_RESET:
      return { courses: [] }
    default:
      return state
  }
}

const instructorCourseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case INSTRUCTOR_COURSE_CREATE_REQUEST:
      return { loading: true, courses: [] }
    case INSTRUCTOR_COURSE_CREATE_SUCCESS:
      return { loading: false, courseId: action.payload, success: true }
    case INSTRUCTOR_COURSE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case INSTRUCTOR_COURSE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

const instructorCourseDetailsReducer = (
  state = { courseDetails: {} },
  action
) => {
  switch (action.type) {
    case INSTRUCTOR_COURSE_DETAILS_REQUEST:
      return { loading: true }
    case INSTRUCTOR_COURSE_DETAILS_SUCCESS:
      return { loading: false, courseDetails: action.payload }
    case INSTRUCTOR_COURSE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case INSTRUCTOR_COURSE_DETAILS_RESET:
      return { coursesDetails: {} }
    default:
      return state
  }
}

const instructorCourseUpdateReducer = (
  state = { courseDetails: {} },
  action
) => {
  switch (action.type) {
    case INSTRUCTOR_COURSE_UPDATE_REQUEST:
      return { loading: true }
    case INSTRUCTOR_COURSE_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case INSTRUCTOR_COURSE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case INSTRUCTOR_COURSE_UPDATE_RESET:
      return { courseDetails: {} }
    default:
      return state
  }
}

export {
  instructorCourseListReducer,
  instructorCourseDetailsReducer,
  instructorCourseUpdateReducer,
  instructorCourseCreateReducer,
}
