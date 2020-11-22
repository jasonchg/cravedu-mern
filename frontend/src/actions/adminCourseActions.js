import axios from 'axios'
import {
  ADMIN_COURSE_DETAILS_FAIL,
  ADMIN_COURSE_DETAILS_REQUEST,
  ADMIN_COURSE_DETAILS_SUCCESS,
  ADMIN_COURSE_LIST_FAIL,
  ADMIN_COURSE_LIST_REQUEST,
  ADMIN_COURSE_LIST_SUCCESS,
  ADMIN_COURSE_UPDATE_FAIL,
  ADMIN_COURSE_UPDATE_REQUEST,
  ADMIN_COURSE_UPDATE_SUCCESS,
} from '../constants/adminConstants'

const listCourses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_COURSE_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/admin/courses', config)

    dispatch({ type: ADMIN_COURSE_LIST_SUCCESS, payload: data })
  } catch (e) {
    dispatch({
      type: ADMIN_COURSE_LIST_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const getCourseById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_COURSE_DETAILS_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/admin/courses/${id}`, config)
    if (data) {
      dispatch({ type: ADMIN_COURSE_DETAILS_SUCCESS, payload: data })
    }
  } catch (e) {
    dispatch({
      type: ADMIN_COURSE_DETAILS_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const updateCourse = (course) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_COURSE_UPDATE_REQUEST })
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
      `/api/admin/courses/${course._id}`,
      course,
      config
    )

    dispatch({ type: ADMIN_COURSE_UPDATE_SUCCESS })
    dispatch({ type: ADMIN_COURSE_DETAILS_SUCCESS, payload: data })
  } catch (e) {
    dispatch({
      type: ADMIN_COURSE_UPDATE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

export { listCourses, getCourseById, updateCourse }
