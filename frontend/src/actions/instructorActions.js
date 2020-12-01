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
} from '../constants/instructorConstants'

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

    const { data } = await axios.get('/api/instructor/', config)

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

    const { data } = await axios.get(`/api/instructor/${id}`, config)
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
      `/api/instructor/${course._id}`,
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

export { listCourses, getCourseById, updateCourse }
