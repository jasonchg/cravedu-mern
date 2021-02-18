import { useState } from 'react'
<<<<<<< HEAD
import { Menu, MenuItem, Divider, Link, Button } from '@material-ui/core'

const Category = ({ category }) => {
=======
import { Chip, Menu, MenuItem, Divider, Link } from '@material-ui/core'

const Category = ({ category, color }) => {
>>>>>>> f4a828b (initial)
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <>
<<<<<<< HEAD
      <Button
        style={{ padding: 7, margin: 5, textAlign: 'start' }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        variant='outlined'
        size='large'
      >
        {category.category}
      </Button>
=======
      <Chip
        color={color}
        style={{ padding: 7, margin: 5 }}
        label={category.category}
        clickable
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />
>>>>>>> f4a828b (initial)

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {category.subCategories.map((item, i) => (
          <Link key={i} href={`/category/${item.subCategory}`}>
            <MenuItem>{item.subCategory}</MenuItem>
            <Divider />
          </Link>
        ))}
      </Menu>
    </>
  )
}

Category.defaultProps = {
  color: 'primary',
}

export default Category
