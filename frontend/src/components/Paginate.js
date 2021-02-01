import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}))

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  isInstructor = false,
}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Pagination
        page={page}
        count={pages}
        renderItem={(x) => (
          <PaginationItem
            component={Link}
            to={
              !isAdmin
                ? !isInstructor
                  ? keyword
                    ? `/search/${keyword}/page/${x.page}`
                    : `/instructor/${x.page}`
                  : `/course/page/${x.page}`
                : `/admin/${x.page}`
            }
            {...x}
          />
        )}
      />
    </div>
  )
}

export default Paginate
