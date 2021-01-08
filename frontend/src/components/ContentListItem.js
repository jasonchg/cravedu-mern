import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  ListItem,
} from '@material-ui/core'
import React, { useState } from 'react'
import Modals from './Modals'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useDispatch, useSelector } from 'react-redux'
import { updateContent } from '../actions/instructorActions'
import { myTrim } from '../utils'
const ContentListItem = ({ courseId, content }) => {
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(null)
  const [videoUploading, setVideoUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  let count = 0

  const uploadVideoHandler = async (e, content) => {
    e.preventDefault()
    // const file = e.target.files[0]
    setVideoUploading(true)

    try {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${userInfo.token}`,
      //     'Content-Type': 'multipart/form-data',
      //   },
      // }
      // const { data } = await axios.post(
      //   `/api/upload/${courseId}/course-content`,
      //   file,
      //   config
      // )

      // problems here

      dispatch(
        updateContent(courseId, {
          contentId: '5ff45fa051f15815403d9ae3',
          name: 'Installing',
          chapter: 'Chapter 2',
          video: '123/123.mp4',
        })
      )

      setVideoUploading(false)
    } catch (e) {
      console.error(e)
      setVideoUploading(false)
    }
  }

  return (
    <div key={content._id}>
      <ListItem>
        <Accordion style={{ width: '100%', background: '#efefef' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {`${(count += 1)}.  ${content.name}`}
          </AccordionSummary>

          <AccordionDetails>
            <Button type='button' onClick={() => setModalOpen(true)}>
              Edit
            </Button>
            <Button type='button'>Delete This Chapter</Button>
            <Modals
              modalOpen={modalOpen}
              modalClose={() => setModalOpen(false)}
              uploadVideoHandler={uploadVideoHandler}
              videoUploading={videoUploading}
              progress={progress}
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
