import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
  Typography,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  makeStyles,
  Checkbox,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import { useDispatch, useSelector } from 'react-redux'
import {
  USER_WATCHED_CONTENT_REQUEST,
  USER_WATCHED_CONTENT_SUCCESS,
} from '../constants/userConstants'

const useStyles = makeStyles((theme) => ({
  accordion: {
    background: 'transparent',
    width: '100%',
    color: '#eee',
    border: '1px solid #eee',
  },
  accordionBody: {
    background: '#eee',
    color: '#090b2f',
  },
  materials: {
    borderTop: '1px solid #090b2f',
    background: '#eee',
    color: '#090b2f',
    paddingTop: 2,
    paddingBottom: 10,
  },
}))

const CourseContentList = ({
  content,
  selectTopicHandler,
  setSelectedVideoName,
  expanded,
  handleAccordion,
  courseId,
  watched,
}) => {
  const classes = useStyles()
  const [checked, setChecked] = useState(false)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  const checkWatched = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    }

    dispatch({ type: USER_WATCHED_CONTENT_REQUEST })

    if (checked === true) {
      setChecked(false)
      try {
        await axios.put(
          `/api/courses/${courseId}/watch`,
          {
            chapterId: content._id,
            watched: false,
          },
          config
        )
        dispatch({ type: USER_WATCHED_CONTENT_SUCCESS })
      } catch (e) {
        console.log(e)
      }
    } else {
      setChecked(true)
      try {
        await axios.put(
          `/api/courses/${courseId}/watch`,
          {
            chapterId: content._id,
            watched: true,
          },
          config
        )
        dispatch({ type: USER_WATCHED_CONTENT_SUCCESS })
      } catch (e) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    setChecked(watched)
  }, [watched])

  return (
    <ListItemText key={content._id}>
      <Accordion
        className={classes.accordion}
        expanded={expanded === content.chapter}
        onChange={handleAccordion(content.chapter)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: '#eee' }} />}
          aria-controls='course-content'
          id='course-content-panel-header'
        >
          <Typography variant='body1' component='span'>
            Chapter {content.chapter}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionBody}>
          <Checkbox checked={checked} onChange={checkWatched} color='primary' />
          <Button
            size='small'
            onClick={() => {
              selectTopicHandler(content._id)
              setSelectedVideoName({
                name: content.name,
                chapter: content.chapter,
              })
            }}
          >
            <h4
              style={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'start',
              }}
            >
              <PlayCircleFilledIcon />
              <div style={{ marginLeft: 7 }}>{content.name}</div>
            </h4>
          </Button>
        </AccordionDetails>
        <div className={classes.materials}>
          <h4 style={{ marginLeft: 7 }}>Supporting Materials</h4>
          <ul>
            <li>PDF File</li>
            <li>Slides File</li>
          </ul>
        </div>
      </Accordion>
    </ListItemText>
  )
}

export default CourseContentList
