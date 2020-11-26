import express from 'express'
import {
  getCourses,
  getCourseById,
  createCourseQandA,
} from '../controllers/courseContollers.js'
import { protectedRoute } from '../middlewares/authMiddlewares.js'
const router = express.Router()

router.route('/').get(getCourses)
router.route('/:id').get(getCourseById)
router.route('/:id/qanda').post(protectedRoute, createCourseQandA)

export default router
