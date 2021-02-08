import { useState } from 'react'
import { Menu, MenuItem, Divider, Link, Button } from '@material-ui/core'

const Category = ({ category }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <>
      <Button
        style={{ padding: 7, margin: 5, textAlign: 'start' }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        variant='outlined'
        size='large'
      >
        {category.category}
      </Button>

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
