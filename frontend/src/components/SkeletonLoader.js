import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

const SkeletonLoader = ({ w, h }) => {
  return (
    <>
      <Skeleton variant='rect' width={w} height={h} />
    </>
  )
}

SkeletonLoader.defaultProps = {
  w: 210,
  h: 118,
}

export default SkeletonLoader
