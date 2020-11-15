import express from 'express'
import { protectedRoute, adminRoute } from '../middlewares/authMiddlewares.js'
import {
  getCourseById,
  getCourses,
} from '../controllers/adminCourseController.js'

const router = express.Router()

router.route('/').get(protectedRoute, adminRoute, getCourses)

router.route('/:id').get(protectedRoute, adminRoute, getCourseById)

export default router
