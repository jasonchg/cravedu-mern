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
<<<<<<< HEAD
  requestPublishCourse,
  sendCourseAnnouncement,
=======
>>>>>>> f4a828b (initial)
} from '../controllers/instructorCourseControllers.js'

const router = express.Router()

router
<<<<<<< HEAD
  .route('/:id/announcement')
  .post(protectedRoute, instructorRoute, sendCourseAnnouncement)

router
  .route('/:id/request-publish')
  .post(protectedRoute, instructorRoute, requestPublishCourse)

router
=======
>>>>>>> f4a828b (initial)
  .route('/')
  .get(protectedRoute, instructorRoute, getCourses)
  .post(protectedRoute, instructorRoute, createCourse)

router
  .route('/:id')
  .get(protectedRoute, instructorRoute, getCourseById)
  .put(protectedRoute, instructorRoute, updateCourse)
  .delete(protectedRoute, instructorRoute, deleteCourse)

export default router
