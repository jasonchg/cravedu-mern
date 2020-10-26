import axios from 'axios'
import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
} from '../constants/courseConstants'

const listCourses = () => async (dispatch) => {
  try {
    dispatch({ type: COURSE_LIST_REQUEST })

    const { data } = await axios.get('/api/courses')

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

export { listCourses }
