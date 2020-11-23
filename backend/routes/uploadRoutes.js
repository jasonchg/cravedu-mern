import express from 'express'
import { uploadCourseImage } from '../controllers/uploadContollers.js'
import { protectedRoute } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router
  .route('/course-image')
  .post(protectedRoute, uploadCourseImage.any(), (req, res) => {
    res.send('/' + req.files[0].path.replace('\\', '/'))
  })

export default router
