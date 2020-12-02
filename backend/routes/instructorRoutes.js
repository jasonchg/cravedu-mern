import {
  protectedRoute,
  instructorRoute,
} from '../middlewares/authMiddlewares.js'
import express from 'express'
import {
  createCourse,
  getCourseById,
  getCourses,
  updateCourse,
} from '../controllers/instructorCourseControllers.js'

const router = express.Router()

router
  .route('/')
  .get(protectedRoute, instructorRoute, getCourses)
  .post(protectedRoute, instructorRoute, createCourse)

router
  .route('/:id')
  .get(protectedRoute, instructorRoute, getCourseById)
  .put(protectedRoute, instructorRoute, updateCourse)

export default router
