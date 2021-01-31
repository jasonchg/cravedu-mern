import { useState } from 'react'
import { Chip, Menu, MenuItem, Divider } from '@material-ui/core'

const Category = ({ category, color, setCatHandler }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <>
      <Chip
        color={color}
        style={{ padding: 7, margin: 5 }}
        label={category.category}
        clickable
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {category.subCategories.map((item, i) => (
          <>
            <MenuItem key={i} onClick={() => setCatHandler(item.subCategory)}>
              {item.subCategory}
            </MenuItem>
            <Divider />
          </>
        ))}
      </Menu>
    </>
  )
}

Category.defaultProps = {
  color: 'primary',
}

export default Category
