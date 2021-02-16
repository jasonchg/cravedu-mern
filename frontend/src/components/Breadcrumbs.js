import {
  Breadcrumbs as Bread,
  Link,
  makeStyles,
  Container,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#cfdbff',
    height: '140px',
  },
  coursePage: {
    height: '50px',
  },
  breadContainer: {
    paddingTop: '7px',
    width: '100vw',
    position: 'relative',
    left: 'calc(-50vw + 50%)',
  },
  breadcrumsContainer: {
    paddingTop: 10,
  },
  currentPageName: {
    fontStyle: 'bold',
    color: '#222',
    fontSize: '77px',
  },
})

const Breadcrumbs = ({
  previousPage,
  currentPage,
  courseScreen = false,
  categoryUrl,
}) => {
  const classes = useStyles()
  return (
    <div
      className={`${classes.breadContainer} ${
        courseScreen ? classes.coursePage : classes.root
      }`}
    >
      <div>
        <Container>
          <Bread className={classes.breadcrumsContainer}>
            {previousPage &&
              previousPage.map((page, i) => (
                <Link key={i} href={page.link}>
                  {page.name.toLowerCase() === 'home' ? (
                    <HomeIcon fontSize='small' />
                  ) : (
                    page.name
                  )}
                </Link>
              ))}
            <Link href={categoryUrl}>{currentPage}</Link>
          </Bread>
          {courseScreen ? null : (
            <div className={classes.currentPageName}>
              <Link>{currentPage}</Link>
            </div>
          )}
        </Container>
      </div>
    </div>
  )
}

export default Breadcrumbs
