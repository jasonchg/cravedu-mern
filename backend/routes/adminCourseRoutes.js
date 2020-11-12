import express from 'express'
import { protectedRoute, adminRoute } from '../middlewares/authMiddlewares.js'
import { getCourses } from '../controllers/adminCourseController.js'

const router = express.Router()

router.route('/').get(protectedRoute, adminRoute, getCourses)

export default router
