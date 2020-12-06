import express from 'express'
import {
  getCourses,
  getCourseById,
  createCourseQandA,
  getBestCourses,
  createCourseReview,
} from '../controllers/courseContollers.js'
import { protectedRoute } from '../middlewares/authMiddlewares.js'
const router = express.Router()

router.route('/').get(getCourses)
router.route('/bestsold').get(getBestCourses)
router.route('/:id/reviews').post(protectedRoute, createCourseReview)
router.route('/:id/qanda').post(protectedRoute, createCourseQandA)
router.route('/:id').get(getCourseById)
export default router
