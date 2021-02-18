import {
  makeStyles,
  Modal,
  Backdrop,
  Button,
  Typography,
  Divider,
} from '@material-ui/core'
import FormContainer from './FormContainer'
import Loader from './Loader'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoBox: {
    marginTop: 20,
  },
}))

const AdminCourseContentModal = ({
  modalOpen = false,
  modalClose,
  content,
}) => {
  const classes = useStyles()
  return (
    <Modal
      className={classes.modal}
      open={modalOpen}
      onClose={modalClose}
      BackdropComponent={Backdrop}
    >
      {!content ? (
        <Loader />
      ) : (
        <div className={classes.paper}>
          <div style={{ flex: 1 }}>
            <Typography variant='caption'>Chapter {content.chapter}</Typography>
            <Typography variant='h4'>{content.name}</Typography>
          </div>

          <Divider />
          <div>
            <div className={classes.videoBox}>
              <FormContainer>
                <div>
                  <video width='420' height='340' controls>
                    <source src={content.video} type='video/mp4' />
                    Your browser does not support the video tag.
                  </video>

                  <p style={{ background: '#eee', padding: 7 }}>
                    <small>Path:</small> {content.video ? content.video : '/'}
                  </p>
                </div>
              </FormContainer>

              <FormContainer>
                <Button variant='outlined' onClick={() => modalClose()}>
                  Done
                </Button>
              </FormContainer>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
export default AdminCourseContentModal
