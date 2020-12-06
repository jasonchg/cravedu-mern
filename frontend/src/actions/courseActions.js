import axios from 'axios'
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
  COURSE_BEST_REQUEST,
  COURSE_BEST_SUCCESS,
  COURSE_BEST_FAIL,
  COURSE_REVIEW_REQUEST,
  COURSE_REVIEW_SUCCESS,
  COURSE_REVIEW_FAIL,
} from '../constants/courseConstants'

const listCourses = (keyword = '') => async (dispatch) => {
  try {
    dispatch({ type: COURSE_LIST_REQUEST })

    const { data } = await axios.get(`/api/courses?keyword=${keyword}`)

    dispatch({
      type: COURSE_LIST_SUCCESS,
      payload: data,
    })
  } catch (e) {
    dispatch({
      type: COURSE_LIST_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const listCourseDetails = (courseId) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/courses/${courseId}`)

    dispatch({
      type: COURSE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (e) {
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const addQanda = (courseId, qanda) => async (dispatch, getState) => {
  try {
    dispatch({ type: COURSE_QANDA_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/courses/${courseId}/qanda`, qanda, config)

    dispatch({ type: COURSE_QANDA_SUCCESS })
    dispatch({
      type: COURSE_DETAILS_REQUEST,
    })
  } catch (e) {
    dispatch({
      type: COURSE_QANDA_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const bestSoldCourses = () => async (dispatch) => {
  try {
    dispatch({ type: COURSE_BEST_REQUEST })

    const { data } = await axios.get('/api/courses/bestsold')

    dispatch({
      type: COURSE_BEST_SUCCESS,
      payload: data,
    })
  } catch (e) {
    dispatch({
      type: COURSE_BEST_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const createReview = (courseId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: COURSE_REVIEW_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/courses/${courseId}/reviews`, review, config)

    dispatch({ type: COURSE_REVIEW_SUCCESS })
  } catch (e) {
    dispatch({
      type: COURSE_REVIEW_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

export {
  listCourses,
  listCourseDetails,
  addQanda,
  bestSoldCourses,
  createReview,
}
