import {
  protectedRoute,
  instructorRoute,
} from '../middlewares/authMiddlewares.js'
import express from 'express'
import {
  createCourse,
  getCourses,
} from '../controllers/instructorCourseControllers.js'

const router = express.Router()

router
  .route('/')
  .get(protectedRoute, instructorRoute, getCourses)
  .post(protectedRoute, instructorRoute, createCourse)

export default router
