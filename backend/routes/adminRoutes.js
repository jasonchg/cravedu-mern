import express from 'express'

import {
  deleteUser,
  getUsers,
  getUserById,
} from '../controllers/adminControllers.js'
import { protectedRoute, adminRoute } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route('/').get(protectedRoute, adminRoute, getUsers)
router
  .route('/:id')
  .delete(protectedRoute, adminRoute, deleteUser)
  .get(protectedRoute, adminRoute, getUserById)

export default router
