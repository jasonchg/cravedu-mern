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
  deleteCourse,
  requestPublishCourse,
} from '../controllers/instructorCourseControllers.js'

const router = express.Router()

router
  .route('/:id/request-publish')
  .post(protectedRoute, instructorRoute, requestPublishCourse)

router
  .route('/')
  .get(protectedRoute, instructorRoute, getCourses)
  .post(protectedRoute, instructorRoute, createCourse)

router
  .route('/:id')
  .get(protectedRoute, instructorRoute, getCourseById)
  .put(protectedRoute, instructorRoute, updateCourse)
  .delete(protectedRoute, instructorRoute, deleteCourse)

export default router
