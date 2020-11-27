import React from 'react'
import ReactPlayer from 'react-player'

import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  playerWrapper: {
    height: 415,
    width: 'auto',
    border: '1px solid #eee',
  },
  reactPlayer: {},
}))

const VideoPlayer = ({ videoPath }) => {
  const classes = useStyles()
  return (
    <div className={classes.playerWrapper}>
      <ReactPlayer
        controls
        className={classes.reactPlayer}
        url={videoPath}
        width='100%'
        height='100%'
      />
    </div>
  )
}

export default VideoPlayer
