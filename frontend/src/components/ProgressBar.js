import React, { useEffect, useState } from 'react'
import { LinearProgress, Typography, Box } from '@material-ui/core'

const ProgressBar = ({ progress: progressing }) => {
  const [progress, setProgress] = useState(progressing)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      )
    }, 200)
    return () => {
      clearInterval(timer)
    }
  }, [])

  function LinearProgressWithLabel(props) {
    return (
      <Box display='flex' alignItems='center'>
        <Box width='100%' mr={1}>
          <LinearProgress variant='determinate' {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant='body2' color='textSecondary'>{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    )
  }

  return <LinearProgressWithLabel value={progress >= 100 ? 100 : progress} />
}

export default ProgressBar
