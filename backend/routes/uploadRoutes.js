import express from 'express'
import {
  uploadCourseImage,
  uploadVideoContent,
} from '../controllers/uploadContollers.js'
import { protectedRoute } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router
  .route('/:id/course-image')
  .post(protectedRoute, uploadCourseImage.any(), (req, res) => {
    res.send('/' + req.files[0].path.replace('\\', '/'))
  })

router
  .route('/:id/course-content')
  .post(protectedRoute, uploadVideoContent.any(), (req, res) => {
    res.send('/' + req.files[0].path.replace('\\', '/'))
  })

export default router
