import express from 'express'
import { protectedRoute } from '../middlewares/authMiddlewares.js'
import { getMyCourses } from '../controllers/myCourseControllers.js'

const router = express.Router()

router.route('/').get(protectedRoute, getMyCourses)

export default router
