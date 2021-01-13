import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  ListItem,
} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import Modals from './Modals'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useDispatch, useSelector } from 'react-redux'
import {
  INSTRUCTOR_COURSE_DETAILS_RESET,
  INSTRUCTOR_UPDATE_CONTENT_RESET,
} from '../constants/instructorConstants'

const ContentListItem = ({ courseId, content, count }) => {
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(null)

  const instructorContentUpdate = useSelector(
    (state) => state.instructorContentUpdate
  )
  const {
    loading: contentUpdateLoading,
    success: contentUpdateSuccess,
    error: contentUpdateError,
  } = instructorContentUpdate

  const deletChapter = () => {
    const msg = `Are you sure to delete this chapter?\n${
      content.video ? '(Video will be deleted as well)' : ''
    }`

    if (window.confirm(msg)) {
      console.log('deleting', content)
    }
  }

  useEffect(() => {
    if (contentUpdateSuccess) {
      dispatch({ type: INSTRUCTOR_UPDATE_CONTENT_RESET })
      dispatch({ type: INSTRUCTOR_COURSE_DETAILS_RESET })
    }
  }, [contentUpdateSuccess])

  return (
    <div key={content._id}>
      <ListItem>
        <Accordion style={{ width: '100%', background: '#efefef' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {`${count}. ${content.name}`}
          </AccordionSummary>

          <AccordionDetails>
            <Button
              variant='outlined'
              type='button'
              onClick={() => setModalOpen(true)}
            >
              Edit
            </Button>
            <Button onClick={deletChapter} type='button'>
              Delete This Chapter
            </Button>
            <Modals
              modalOpen={modalOpen}
              modalClose={() => setModalOpen(false)}
              courseId={courseId}
              content={content}
            />
          </AccordionDetails>
        </Accordion>
      </ListItem>
      <Divider />
    </div>
  )
}

export default ContentListItem
