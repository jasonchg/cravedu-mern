import { MenuItem } from '@material-ui/core'
import React from 'react'

const CategorySelectList = ({ category, selectCategoryHanlder }) => {
  return (
    <div style={{ padding: '10px 0' }}>
      <b style={{ paddingLeft: 7 }}> {category.category}</b>
      {category.subCategories.map((item, i) => (
        <MenuItem
          key={i}
          value={item.subCategory}
          onClick={() => selectCategoryHanlder(item.subCategory)}
        >
          {item.subCategory}
        </MenuItem>
      ))}
    </div>
  )
}

export default CategorySelectList
