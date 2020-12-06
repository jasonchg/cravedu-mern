import { makeStyles, fade, InputBase, IconButton } from '@material-ui/core'
import { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '98%',
    marginLeft: 7,
  },
  inputRoot: {
    color: 'inherit',
    width: '94%',
  },
  inputInput: {
    paddingLeft: 10,
  },
  iconButton: {
    padding: 7,
  },
}))

const SearchBox = ({ history, closeDrawer }) => {
  const [keyword, setKeyword] = useState('')
  const classes = useStyles()

  const submitHandler = (e) => {
    e.preventDefault()
    closeDrawer(false)
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.search}>
        <InputBase
          placeholder='Search…'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <IconButton
          type='submit'
          className={classes.iconButton}
          aria-label='search'
        >
          <SearchIcon />
        </IconButton>
      </div>
    </form>
  )
}

export default SearchBox
