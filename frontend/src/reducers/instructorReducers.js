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
  INSTRUCTOR_ADD_CONTENT_REQUEST,
  INSTRUCTOR_ADD_CONTENT_SUCCESS,
  INSTRUCTOR_ADD_CONTENT_FAIL,
  INSTRUCTOR_ADD_CONTENT_RESET,
  INSTRUCTOR_UPDATE_CONTENT_REQUEST,
  INSTRUCTOR_UPDATE_CONTENT_SUCCESS,
  INSTRUCTOR_UPDATE_CONTENT_FAIL,
  INSTRUCTOR_UPDATE_CONTENT_RESET,
  INSTRUCTOR_DELETE_COURSE_REQUEST,
  INSTRUCTOR_DELETE_COURSE_SUCCESS,
  INSTRUCTOR_DELETE_COURSE_FAIL,
  INSTRUCTOR_DELETE_COURSE_RESET,
  INSTRUCTOR_DELETE_CONTENT_REQUEST,
  INSTRUCTOR_DELETE_CONTENT_SUCCESS,
  INSTRUCTOR_DELETE_CONTENT_FAIL,
  INSTRUCTOR_DELETE_CONTENT_RESET,
  INSTRUCTOR_UPDATE_CONTENT_QUIZ_REQUEST,
  INSTRUCTOR_UPDATE_CONTENT_QUIZ_SUCCESS,
  INSTRUCTOR_UPDATE_CONTENT_QUIZ_FAIL,
  INSTRUCTOR_UPDATE_CONTENT_QUIZ_RESET,
  INSTRUCTOR_PUBLISH_COURSE_REQUEST,
  INSTRUCTOR_PUBLISH_COURSE_SUCCESS,
  INSTRUCTOR_PUBLISH_COURSE_FAIL,
  INSTRUCTOR_PUBLISH_COURSE_RESET,
  INSTRUCTOR_ANNOUNCEMENT_REQUEST,
  INSTRUCTOR_ANNOUNCEMENT_SUCCESS,
  INSTRUCTOR_ANNOUNCEMENT_FAIL,
  INSTRUCTOR_ANNOUNCEMENT_RESET,
} from '../constants/instructorConstants'

const instructorCourseListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case INSTRUCTOR_COURSE_LIST_REQUEST:
      return { loading: true, courses: [] }
    case INSTRUCTOR_COURSE_LIST_SUCCESS:
      return {
        loading: false,
        courses: action.payload.courses,
        pages: action.payload.pages,
        page: action.payload.page,
      }
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

const instructorContentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case INSTRUCTOR_ADD_CONTENT_REQUEST:
      return { loading: true, courses: [] }
    case INSTRUCTOR_ADD_CONTENT_SUCCESS:
      return { loading: false, success: true }
    case INSTRUCTOR_ADD_CONTENT_FAIL:
      return { loading: false, error: action.payload }
    case INSTRUCTOR_ADD_CONTENT_RESET:
      return {}
    default:
      return state
  }
}

const instructorContentUpdateReducer = (
  state = { courseVideoContent: {} },
  action
) => {
  switch (action.type) {
    case INSTRUCTOR_UPDATE_CONTENT_REQUEST:
      return { loading: true, courseVideoContent: [] }
    case INSTRUCTOR_UPDATE_CONTENT_SUCCESS:
      return { loading: false, success: true }
    case INSTRUCTOR_UPDATE_CONTENT_FAIL:
      return { loading: false, error: action.payload }
    case INSTRUCTOR_UPDATE_CONTENT_RESET:
      return { courseVideoContent: {} }
    default:
      return state
  }
}

const instructorContentUpdateQuizReducer = (
  state = { quizzes: [] },
  action
) => {
  switch (action.type) {
    case INSTRUCTOR_UPDATE_CONTENT_QUIZ_REQUEST:
      return { loading: true, quizzes: [] }
    case INSTRUCTOR_UPDATE_CONTENT_QUIZ_SUCCESS:
      return { loading: false, success: true, quizzes: action.payload }
    case INSTRUCTOR_UPDATE_CONTENT_QUIZ_FAIL:
      return { loading: false, error: action.payload }
    case INSTRUCTOR_UPDATE_CONTENT_QUIZ_RESET:
      return { quizzes: [] }
    default:
      return state
  }
}

const instructorCourseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case INSTRUCTOR_DELETE_COURSE_REQUEST:
      return { loading: true }
    case INSTRUCTOR_DELETE_COURSE_SUCCESS:
      return { loading: false, success: true }
    case INSTRUCTOR_DELETE_COURSE_FAIL:
      return { loading: false, error: action.payload }
    case INSTRUCTOR_DELETE_COURSE_RESET:
      return {}
    default:
      return state
  }
}

const instructorContentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case INSTRUCTOR_DELETE_CONTENT_REQUEST:
      return { loading: true }
    case INSTRUCTOR_DELETE_CONTENT_SUCCESS:
      return { loading: false, success: true }
    case INSTRUCTOR_DELETE_CONTENT_FAIL:
      return { loading: false, error: action.payload }
    case INSTRUCTOR_DELETE_CONTENT_RESET:
      return {}
    default:
      return state
  }
}

const instructorCoursePublishRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case INSTRUCTOR_PUBLISH_COURSE_REQUEST:
      return { loading: true }
    case INSTRUCTOR_PUBLISH_COURSE_SUCCESS:
      return { loading: false, success: true }
    case INSTRUCTOR_PUBLISH_COURSE_FAIL:
      return { loading: false, error: action.payload }
    case INSTRUCTOR_PUBLISH_COURSE_RESET:
      return {}
    default:
      return state
  }
}

const instructorAnnouncementReducer = (state = {}, action) => {
  switch (action.type) {
    case INSTRUCTOR_ANNOUNCEMENT_REQUEST:
      return { loading: true }
    case INSTRUCTOR_ANNOUNCEMENT_SUCCESS:
      return { loading: false, success: true }
    case INSTRUCTOR_ANNOUNCEMENT_FAIL:
      return { loading: false, error: action.payload }
    case INSTRUCTOR_ANNOUNCEMENT_RESET:
      return {}
    default:
      return state
  }
}

export {
  instructorContentDeleteReducer,
  instructorCourseListReducer,
  instructorCourseDetailsReducer,
  instructorCourseUpdateReducer,
  instructorCourseCreateReducer,
  instructorContentCreateReducer,
  instructorContentUpdateReducer,
  instructorCourseDeleteReducer,
  instructorContentUpdateQuizReducer,
  instructorCoursePublishRequestReducer,
  instructorAnnouncementReducer,
}
