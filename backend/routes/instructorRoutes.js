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
  addCourseContent,
  updateContent,
  deleteCourse,
} from '../controllers/instructorCourseControllers.js'

const router = express.Router()

router
  .route('/:id/updatecontent')
  .put(protectedRoute, instructorRoute, updateContent)

router
  .route('/:id/addcontent')
  .post(protectedRoute, instructorRoute, addCourseContent)

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
