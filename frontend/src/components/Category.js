import React from 'react'
import { Chip } from '@material-ui/core'

const Category = ({ category, color }) => {
  return (
    <Chip
      color={color}
      style={{ padding: 7, marginLeft: 8 }}
      label={category.name}
      href={category.link}
      clickable
    />
  )
}

Category.defaultProps = {
  color: 'primary',
}

export default Category
