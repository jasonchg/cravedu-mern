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
  deleteContent,
  updateContentQuizzes,
  getContentQuizzes,
} from '../controllers/instructorCourseControllers.js'

const router = express.Router()

router
  .route('/:id/:contentId')
  .delete(protectedRoute, instructorRoute, deleteContent)

router
  .route('/:id/updatecontent')
  .put(protectedRoute, instructorRoute, updateContent)

router
  .route('/:id/updatecontentquizzes/')
  .put(protectedRoute, instructorRoute, updateContentQuizzes)

router
  .route('/:id/contentquizzes/')
  .get(protectedRoute, instructorRoute, getContentQuizzes)

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
