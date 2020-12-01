import {
  protectedRoute,
  instructorRoute,
} from '../middlewares/authMiddlewares.js'
import express from 'express'
import { createCourse } from '../controllers/instructorCourseControllers.js'

const router = express.Router()

router.route('/').post(protectedRoute, instructorRoute, createCourse)

export default router
