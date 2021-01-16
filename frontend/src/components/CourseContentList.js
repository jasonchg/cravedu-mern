import React, { useState } from 'react'

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
}))

const CourseContentList = ({
  content,
  selectTopicHandler,
  setSelectedVideoName,
}) => {
  const classes = useStyles()

  const [checked, setChecked] = useState(false)

  return (
    <ListItemText key={content._id}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: '#eee' }} />}
          aria-controls='course-content'
          id='course-content-panel-header'
        >
          <Typography variant='body1' component='span'>
            {content.chapter}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionBody}>
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            color='primary'
          />

          <Button
            onClick={() => {
              selectTopicHandler(content._id)
              setSelectedVideoName({
                name: content.name,
                chapter: content.chapter,
              })
            }}
          >
            <Typography
              variant='body1'
              component='span'
              style={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'start',
              }}
            >
              <PlayCircleFilledIcon />
              <div style={{ marginLeft: 7 }}>{content.name}</div>
            </Typography>
          </Button>
        </AccordionDetails>
      </Accordion>
    </ListItemText>
  )
}

export default CourseContentList
