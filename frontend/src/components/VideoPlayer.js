import React from 'react'
import ReactPlayer from 'react-player'

import { useDispatch } from 'react-redux'
import { updateWatched } from '../actions/courseActions'

const VideoPlayer = ({ videoPath, selectedVideoId, courseId }) => {
  const dispatch = useDispatch()

  const checkWatched = () => {
    dispatch(
      updateWatched(courseId, {
        id: selectedVideoId,
        watch: true,
      })
    )
  }

  return (
    <div className='player-wrapper'>
      <ReactPlayer
        config={{ file: { attributes: { controlsList: 'nodownload' } } }}
        onContextMenu={(e) => e.preventDefault()}
        className='react-player'
        controls
        volume={1}
        url={videoPath}
        width='100%'
        height='100%'
        onEnded={checkWatched}
      />
    </div>
  )
}

export default VideoPlayer
