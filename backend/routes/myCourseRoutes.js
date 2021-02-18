import express from 'express'
import { protectedRoute } from '../middlewares/authMiddlewares.js'
<<<<<<< HEAD
import {
  getMyCourses,
  updateMyCourse,
} from '../controllers/myCourseControllers.js'

const router = express.Router()

router.route('/:id').get(protectedRoute, updateMyCourse)
=======
import { getMyCourses } from '../controllers/myCourseControllers.js'

const router = express.Router()

>>>>>>> f4a828b (initial)
router.route('/').get(protectedRoute, getMyCourses)

export default router
