import express from 'express'
import {
  getNotificationById,
  readNotificationById,
} from '../controllers/notificationContollers.js'
import { protectedRoute } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route('/:id/:read').put(protectedRoute, readNotificationById)
router.route('/:id').get(protectedRoute, getNotificationById)

export default router
