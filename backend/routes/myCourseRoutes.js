import express from 'express'
import { protectedRoute } from '../middlewares/authMiddlewares.js'
import {
  getMyCourses,
  updateMyCourse,
} from '../controllers/myCourseControllers.js'

const router = express.Router()

router.route('/:id').get(protectedRoute, updateMyCourse)
router.route('/').get(protectedRoute, getMyCourses)

export default router
