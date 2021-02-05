import {
  protectedRoute,
  instructorRoute,
} from '../middlewares/authMiddlewares.js'
import express from 'express'
import {
  addCourseContent,
  updateContent,
  deleteContent,
  updateContentQuizzes,
  getContentQuizzes,
  deleteContentQuizzes,
} from '../controllers/instructorCourseControllers.js'

const router = express.Router()

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
  .route('/:id/:contentId/:quizId/deletequiz')
  .delete(protectedRoute, instructorRoute, deleteContentQuizzes)

router
  .route('/:id/:contentId')
  .delete(protectedRoute, instructorRoute, deleteContent)

export default router
