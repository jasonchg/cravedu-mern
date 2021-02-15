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
  sendCourseAnnouncement,
} from '../controllers/instructorCourseControllers.js'

const router = express.Router()

router
  .route('/:id/announcement')
  .post(protectedRoute, instructorRoute, sendCourseAnnouncement)

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
