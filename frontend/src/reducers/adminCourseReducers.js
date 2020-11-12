import {
  ADMIN_COURSE_LIST_FAIL,
  ADMIN_COURSE_LIST_REQUEST,
  ADMIN_COURSE_LIST_RESET,
  ADMIN_COURSE_LIST_SUCCESS,
} from '../constants/adminConstants'

const adminCourseListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case ADMIN_COURSE_LIST_REQUEST:
      return { loading: true, courses: [] }
    case ADMIN_COURSE_LIST_SUCCESS:
      return { loading: false, courses: action.payload }
    case ADMIN_COURSE_LIST_FAIL:
      return { loading: false, error: action.payload }
    case ADMIN_COURSE_LIST_RESET:
      return { courses: [] }
    default:
      return state
  }
}

export { adminCourseListReducer }
