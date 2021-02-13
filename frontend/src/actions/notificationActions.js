import axios from 'axios'
import {
  NOTIFICATION_DELETE_FAIL,
  NOTIFICATION_DELETE_REQUEST,
  NOTIFICATION_DELETE_SUCCESS,
  NOTIFICATION_READ_FAIL,
  NOTIFICATION_READ_REQUEST,
  NOTIFICATION_READ_SUCCESS,
  USER_NOTIFICATION_FAIL,
  USER_NOTIFICATION_REQUEST,
  USER_NOTIFICATION_SUCCESS,
} from '../constants/notificationConstants'

const getUserNotification = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_NOTIFICATION_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/notifications/${userInfo._id}`,
      config
    )

    dispatch({ type: USER_NOTIFICATION_SUCCESS, payload: data })
  } catch (e) {
    dispatch({
      type: USER_NOTIFICATION_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const readUserNotification = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTIFICATION_READ_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(
      `/api/notifications/${id}`,
      {
        read: true,
      },
      config
    )

    dispatch({ type: NOTIFICATION_READ_SUCCESS })
  } catch (e) {
    dispatch({
      type: NOTIFICATION_READ_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const deleteUserNotification = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTIFICATION_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/notifications/${id}`, config)

    dispatch({ type: NOTIFICATION_DELETE_SUCCESS })
  } catch (e) {
    dispatch({
      type: NOTIFICATION_DELETE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

export { getUserNotification, deleteUserNotification, readUserNotification }
