import express from 'express'
import { uploadCourseImage } from '../controllers/uploadContollers.js'
import { protectedRoute } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route('/course-image').post(
  protectedRoute,

  uploadCourseImage.single('image'),
  (req, res) => {
    res.send(`/${req.file.path}`)
  }
)

export default router
