import React from 'react'
import { Chip } from '@material-ui/core'

const Category = ({ category }) => {
  return (
    <Chip
      style={{ padding: 7, marginLeft: 8 }}
      label={category.name}
      href={category.link}
      clickable
    />
  )
}

export default Category
