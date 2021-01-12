import express from 'express'
import {
  uploadCourseImage,
  uploadVideoContent,
} from '../controllers/uploadContollers.js'
import { protectedRoute } from '../middlewares/authMiddlewares.js'
import progress from 'progress-stream'

const p = progress()

const router = express.Router()

router
  .route('/:id/course-image')
  .post(protectedRoute, uploadCourseImage.any(), (req, res) => {
    res.send('/' + req.files[0].path.replace(/\\/g, '/'))
  })

router
  .route('/:id/course-content')
  .post(protectedRoute, uploadVideoContent.any(), (req, res) => {
    // req.pipe(p)
    // p.on('progress', (progress) => {
    //   res.write({ progress: progress.percentage })
    //   res.write({ data: '/' + req.files[0].path.replace(/\\/g, '/') })
    // })
    // res.end()
    res.send('/' + req.files[0].path.replace(/\\/g, '/'))
  })

export default router
