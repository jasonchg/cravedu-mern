import express from 'express'

import {
  deleteUser,
  getUsers,
  getUserById,
  updateUser,
} from '../controllers/adminControllers.js'
import { protectedRoute, adminRoute } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route('/').get(protectedRoute, adminRoute, getUsers)
router
  .route('/:id')
  .delete(protectedRoute, adminRoute, deleteUser)
  .get(protectedRoute, adminRoute, getUserById)
  .put(protectedRoute, adminRoute, updateUser)

export default router
