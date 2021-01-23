import React from 'react'
import ReactPlayer from 'react-player'
import axios from 'axios'
import {
  USER_WATCHED_CONTENT_REQUEST,
  USER_WATCHED_CONTENT_SUCCESS,
} from '../constants/userConstants'
import { useDispatch, useSelector } from 'react-redux'

const VideoPlayer = ({ videoPath, selectedVideoId, courseId }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  const checkWatched = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    }

    dispatch({ type: USER_WATCHED_CONTENT_REQUEST })

    try {
      await axios.put(
        `/api/courses/${courseId}/watch`,
        {
          chapterId: selectedVideoId,
          watched: true,
        },
        config
      )
      dispatch({ type: USER_WATCHED_CONTENT_SUCCESS })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='player-wrapper'>
      <ReactPlayer
        className='react-player'
        controls
        volume={1}
        url={videoPath}
        width='100%'
        height='100%'
        onEnded={() =>
          console.table({
            courseId,
            selectedVideoId,
          })
        }
      />
    </div>
  )
}

export default VideoPlayer
