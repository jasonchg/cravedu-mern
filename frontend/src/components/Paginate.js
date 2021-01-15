import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
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
                  : `/page/${x.page}`
                : `/admin/courses/${x.page}`
            }
            {...x}
          />
        )}
      />
    </div>
  )
}

export default Paginate
