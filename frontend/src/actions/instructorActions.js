import axios from 'axios'
import {
  INSTRUCTOR_COURSE_DETAILS_FAIL,
  INSTRUCTOR_COURSE_DETAILS_REQUEST,
  INSTRUCTOR_COURSE_DETAILS_SUCCESS,
  INSTRUCTOR_COURSE_LIST_FAIL,
  INSTRUCTOR_COURSE_LIST_REQUEST,
  INSTRUCTOR_COURSE_LIST_SUCCESS,
  INSTRUCTOR_COURSE_UPDATE_FAIL,
  INSTRUCTOR_COURSE_UPDATE_REQUEST,
  INSTRUCTOR_COURSE_UPDATE_SUCCESS,
  INSTRUCTOR_COURSE_CREATE_FAIL,
  INSTRUCTOR_COURSE_CREATE_REQUEST,
  INSTRUCTOR_COURSE_CREATE_SUCCESS,
  INSTRUCTOR_ADD_CONTENT_REQUEST,
  INSTRUCTOR_ADD_CONTENT_SUCCESS,
  INSTRUCTOR_ADD_CONTENT_FAIL,
  INSTRUCTOR_UPDATE_CONTENT_REQUEST,
  INSTRUCTOR_UPDATE_CONTENT_SUCCESS,
  INSTRUCTOR_UPDATE_CONTENT_FAIL,
  INSTRUCTOR_DELETE_CONTENT_REQUEST,
  INSTRUCTOR_DELETE_CONTENT_SUCCESS,
  INSTRUCTOR_DELETE_CONTENT_FAIL,
  INSTRUCTOR_DELETE_COURSE_REQUEST,
  INSTRUCTOR_DELETE_COURSE_SUCCESS,
  INSTRUCTOR_DELETE_COURSE_FAIL,
} from '../constants/instructorConstants'

const createCourse = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INSTRUCTOR_COURSE_CREATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/instructor/courses', {}, config)

    dispatch({
      type: INSTRUCTOR_COURSE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (e) {
    dispatch({
      type: INSTRUCTOR_COURSE_CREATE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const listCourses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INSTRUCTOR_COURSE_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/instructor/courses', config)

    dispatch({ type: INSTRUCTOR_COURSE_LIST_SUCCESS, payload: data })
  } catch (e) {
    dispatch({
      type: INSTRUCTOR_COURSE_LIST_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const getCourseById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: INSTRUCTOR_COURSE_DETAILS_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/instructor/courses/${id}`, config)
    if (data) {
      dispatch({ type: INSTRUCTOR_COURSE_DETAILS_SUCCESS, payload: data })
    }
  } catch (e) {
    dispatch({
      type: INSTRUCTOR_COURSE_DETAILS_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const updateCourse = (course) => async (dispatch, getState) => {
  try {
    dispatch({ type: INSTRUCTOR_COURSE_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/instructor/courses/${course._id}`,
      course,
      config
    )

    dispatch({ type: INSTRUCTOR_COURSE_UPDATE_SUCCESS })
    dispatch({ type: INSTRUCTOR_COURSE_DETAILS_SUCCESS, payload: data })
  } catch (e) {
    dispatch({
      type: INSTRUCTOR_COURSE_UPDATE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const createContent = (id, content) => async (dispatch, getState) => {
  try {
    dispatch({ type: INSTRUCTOR_ADD_CONTENT_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(
      `/api/instructor/courses/${id}/addcontent`,
      content,
      config
    )

    dispatch({
      type: INSTRUCTOR_ADD_CONTENT_SUCCESS,
    })
  } catch (e) {
    dispatch({
      type: INSTRUCTOR_ADD_CONTENT_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const deleteCourse = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: INSTRUCTOR_DELETE_COURSE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/instructor/courses/${id}`, config)

    dispatch({
      type: INSTRUCTOR_DELETE_COURSE_SUCCESS,
    })
  } catch (e) {
    dispatch({
      type: INSTRUCTOR_DELETE_COURSE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const updateContent = (courseId, content) => async (dispatch, getState) => {
  try {
    dispatch({ type: INSTRUCTOR_UPDATE_CONTENT_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(
      `/api/instructor/courses/${courseId}/updatecontent`,
      content,
      config
    )

    dispatch({ type: INSTRUCTOR_UPDATE_CONTENT_SUCCESS })
  } catch (e) {
    dispatch({
      type: INSTRUCTOR_UPDATE_CONTENT_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const deleteContent = (courseId, contentId) => async (dispatch, getState) => {
  try {
    dispatch({ type: INSTRUCTOR_DELETE_CONTENT_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(
      `/api/instructor/courses/${courseId}/${contentId}`,
      config
    )

    dispatch({ type: INSTRUCTOR_DELETE_CONTENT_SUCCESS })
  } catch (e) {
    dispatch({
      type: INSTRUCTOR_DELETE_CONTENT_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

export {
  listCourses,
  getCourseById,
  updateCourse,
  createCourse,
  deleteCourse,
  createContent,
  updateContent,
  deleteContent,
}
