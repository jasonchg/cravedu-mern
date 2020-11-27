import React from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = ({ videoPath }) => {
  return (
    <div className='player-wrapper'>
      <ReactPlayer
        className='react-player'
        controls
        url={videoPath}
        width='100%'
        height='100%'
      />
    </div>
  )
}

export default VideoPlayer
