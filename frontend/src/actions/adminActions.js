import axios from 'axios'

import {
  ADMIN_USER_LIST_REQUEST,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_USER_LIST_FAIL,
  ADMIN_USER_DETAILS_FAIL,
  ADMIN_USER_DETAILS_REQUEST,
  ADMIN_USER_DETAILS_SUCCESS,
  ADMIN_USER_UPDATE_REQUEST,
  ADMIN_USER_UPDATE_SUCCESS,
  ADMIN_USER_UPDATE_FAIL,
  ADMIN_USER_DELETE_SUCCESS,
  ADMIN_USER_DELETE_REQUEST,
  ADMIN_USER_DELETE_FAIL,
} from '../constants/adminConstants'

const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USER_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/admin/users', config)

    dispatch({ type: ADMIN_USER_LIST_SUCCESS, payload: data })
  } catch (e) {
    dispatch({
      type: ADMIN_USER_LIST_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const getUserById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USER_DETAILS_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/admin/users/${id}`, config)

    dispatch({ type: ADMIN_USER_DETAILS_SUCCESS, payload: data })
  } catch (e) {
    dispatch({
      type: ADMIN_USER_DETAILS_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USER_UPDATE_REQUEST })
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
      `/api/admin/users/${user._id}`,
      user,
      config
    )

    dispatch({ type: ADMIN_USER_UPDATE_SUCCESS })
    dispatch({ type: ADMIN_USER_DETAILS_SUCCESS, payload: data })
  } catch (e) {
    dispatch({
      type: ADMIN_USER_UPDATE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

const deleteUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USER_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/admin/users/${user._id}`, config)

    dispatch({ type: ADMIN_USER_DELETE_SUCCESS })
  } catch (e) {
    dispatch({
      type: ADMIN_USER_DELETE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

export { listUsers, getUserById, updateUser, deleteUser }
