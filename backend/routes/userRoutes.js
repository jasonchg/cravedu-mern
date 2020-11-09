import express from 'express'

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
} from '../controllers/userControllers.js'
import { protectedRoute, adminRoute } from '../middlewares/authMiddlewares.js'

const router = express.Router()
router.route('/').post(registerUser).get(protectedRoute, adminRoute, getUsers)
router.route('/login').post(authUser)
router
  .route('/profile')
  .get(protectedRoute, getUserProfile)
  .put(protectedRoute, updateUserProfile)

export default router
