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
  COURSE_CATEGORIES_REQUEST,
  COURSE_CATEGORIES_SUCCESS,
  COURSE_CATEGORIES_FAIL,
  COURSE_ANSWER_QANDA_REQUEST,
  COURSE_ANSWER_QANDA_SUCCESS,
  COURSE_ANSWER_QANDA_FAIL,
} from '../constants/courseConstants'
import {
  USER_WATCHED_CONTENT_REQUEST,
  USER_WATCHED_CONTENT_SUCCESS,
} from '../constants/userConstants'

const listCourses = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: COURSE_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/courses?keyword=${keyword}&pageNumber=${pageNumber}`
    )
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

const listCoursesByCategory = (category = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: COURSE_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/courses/category?category=${category}&pageNumber=${pageNumber}`
    )
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

const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: COURSE_CATEGORIES_REQUEST })
    const { data } = await axios.get('/api/courses/categories')

    dispatch({
      type: COURSE_CATEGORIES_SUCCESS,
      payload: data,
    })
  } catch (e) {
    dispatch({
      type: COURSE_CATEGORIES_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const listCourseDetails = (courseSlug) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/courses/${courseSlug}`)

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

const replyQanda = (courseId, qandaId, answer) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: COURSE_ANSWER_QANDA_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const reply = {
      userName: userInfo.name,
      answer,
    }

    await axios.post(`/api/courses/${courseId}/qanda/${qandaId}`, reply, config)
    dispatch({ type: COURSE_ANSWER_QANDA_SUCCESS })
    dispatch({
      type: COURSE_DETAILS_REQUEST,
    })
  } catch (e) {
    dispatch({
      type: COURSE_ANSWER_QANDA_FAIL,
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
const updateWatched = (courseId, content) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_WATCHED_CONTENT_REQUEST })
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
      `/api/courses/${courseId}/watch`,
      {
        chapterId: content.id,
        watched: content.watch,
      },
      config
    )
    dispatch({ type: USER_WATCHED_CONTENT_SUCCESS })
  } catch (e) {
    console.log(e)
  }
}

export {
  listCourses,
  listCourseDetails,
  addQanda,
  bestSoldCourses,
  createReview,
  updateWatched,
  listCategories,
  listCoursesByCategory,
  replyQanda,
}
