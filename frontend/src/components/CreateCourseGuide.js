import { makeStyles, Grid } from '@material-ui/core'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder'
import CreateIcon from '@material-ui/icons/Create'
import TurnedInIcon from '@material-ui/icons/TurnedIn'
const useStyles = makeStyles({
  guideContainer: {
    background: '#F1FAEE',
    margin: '40px 0',
  },
  iconContainer: {
    textAlign: 'center',
    padding: '40px',
    margin: '10px',
  },
  content: {
    textAlign: 'justify',
  },
  icon: {
    fontSize: '40px',
  },
})

const CreateCourseGuide = () => {
  const classes = useStyles()

  return (
    <>
      <Grid container spacing={3} className={classes.guideContainer}>
        <Grid item md={4}>
          <div className={classes.iconContainer}>
            <div>
              <CreateNewFolderIcon className={classes.icon} />
            </div>
            <div>
              <h2>Create</h2>
              <p className={classes.content}>
                Simply click the create the "create button" the system will auto
                generate a empty project for you.
              </p>
            </div>
          </div>
        </Grid>
        <Grid item md={4}>
          <div className={classes.iconContainer}>
            <div>
              <CreateIcon className={classes.icon} />
            </div>
            <div>
              <h2>Update</h2>
              <p className={classes.content}>
                Click the "edit button" on the very right of the list, it will
                redirect you to the edit page, modify the details and update the
                course content.
              </p>
            </div>
          </div>
        </Grid>
        <Grid item md={4}>
          <div className={classes.iconContainer}>
            <div>
              <TurnedInIcon className={classes.icon} />
            </div>
            <div>
              <h2>Publish</h2>
              <p className={classes.content}>
                Finaly, when you are ready to sell your course, click the "I
                wish to submit button" on the edit page for us yo review your
                course.
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default CreateCourseGuide
