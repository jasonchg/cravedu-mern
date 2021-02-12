import { useState } from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ReplyIcon from '@material-ui/icons/Reply'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Button,
  Avatar,
  ListItemAvatar,
  ButtonGroup,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  Modal,
  TextField,
} from '@material-ui/core'
import FormContainer from './FormContainer'
import Message from './Message'

const useStyle = makeStyles((theme) => ({
  paper: {
    background: '#f1faee',
    margin: 'auto',
    marginTop: 10,
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalPaper: {
    width: 400,
    height: 240,
    backgroundColor: '#f1faee',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 10,
  },
  questionBlock: {
    margin: 2,
    background: '#f1faee',
  },
  buttonLike: {
    color: 'green',
  },
  buttonDislike: {
    color: 'red',
  },
}))

const QuestionThread = ({ qanda }) => {
  const classes = useStyle()
  const [answer, setAnswer] = useState('')
  const [like, setLike] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const likeReply = (thought) => {
    if (thought) {
      setLike(true)
    } else {
      setLike(false)
    }
  }

  const answerHandler = () => {
    alert('send')
  }

  const modal = (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby='qanda'
      aria-describedby='qanda-pool'
      className={classes.modalContainer}
    >
      <div className={classes.modalPaper}>
        <form onSubmit={answerHandler}>
          <FormContainer>
            <TextField
              required
              id='answer'
              type='text'
              label='Your Answer'
              placeholder=''
              variant='filled'
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              fullWidth
            />
          </FormContainer>
          <br />
          <Button type='submit' variant='contained' color='primary'>
            Post
          </Button>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
        </form>
        <br />
        <Message severity='info'>
          Please kindly wait for instructor to grant your answer.
        </Message>
      </div>
    </Modal>
  )

  return (
    <div key={qanda._id}>
      <Paper className={classes.questionBlock}>
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar style={{ marginRight: 10 }}>
              {qanda.userName.charAt(0)}
            </Avatar>
          </ListItemAvatar>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '10fr .7fr',
            }}
          >
            <div>
              <ListItemText
                primary={<strong>{qanda.question}</strong>}
                secondary={
                  <span>
                    <Typography
                      component='span'
                      variant='body2'
                      color='textPrimary'
                    >
                      {qanda.userName}
                    </Typography>{' '}
                    {qanda.createdAt && qanda.createdAt.substring(10, 0)}
                  </span>
                }
              />
            </div>
            <div>
              <Button size='large' onClick={() => setModalOpen(true)}>
                <ReplyIcon /> Reply
              </Button>
              {modal}
            </div>
          </div>
        </ListItem>
      </Paper>

      {qanda.answers && qanda.answers.length !== 0 ? (
        <List
          style={{
            marginLeft: 25,
            background: '#f1faee',
          }}
        >
          <Accordion
            style={{
              background: '#f1faee',
              boxShadow: 'none',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='answers-content'
              id='answers-content-header'
            >
              {qanda.answers.filter((x) => x.granted === true).length} had
              answered to this question.
            </AccordionSummary>
            <Divider />

            {qanda.answers.map((thread, i) => {
              return thread.granted === true ? (
                <AccordionDetails key={i}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        style={{
                          marginRight: 10,
                        }}
                      >
                        {thread.userName.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '10fr  .7fr',
                      }}
                    >
                      <div>
                        <ListItemText
                          primary={<span>{thread.answer}</span>}
                          secondary={
                            <span>
                              <Typography
                                component='span'
                                variant='body2'
                                color='textPrimary'
                              >
                                {thread.userName}
                              </Typography>{' '}
                              {thread.createdAt &&
                                thread.createdAt.substring(10, 0)}
                            </span>
                          }
                        />
                      </div>

                      <div>
                        <ButtonGroup disableElevation variant='contained'>
                          <IconButton
                            className={
                              like && like !== null ? classes.buttonLike : ''
                            }
                            onClick={() => likeReply(true)}
                          >
                            <ThumbUpIcon />
                            {thread.helpful && thread.helpful}
                          </IconButton>
                          <IconButton
                            className={
                              !like && like !== null
                                ? classes.buttonDislike
                                : ''
                            }
                            onClick={() => likeReply(false)}
                          >
                            {thread.notHelpful && thread.notHelpful}
                            <ThumbDownIcon />
                          </IconButton>
                        </ButtonGroup>
                      </div>
                    </div>
                    <Divider className={classes.divider} />
                  </ListItem>
                </AccordionDetails>
              ) : (
                ''
              )
            })}
          </Accordion>
        </List>
      ) : (
        ''
      )}

      <br />
    </div>
  )
}

export default QuestionThread
