import express from 'express'

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userControllers.js'
import { protectedRoute } from '../middlewares/authMiddlewares.js'

const router = express.Router()
router.route('/').post(registerUser)
router.route('/login').post(authUser)
router
  .route('/profile')
  .get(protectedRoute, getUserProfile)
  .put(protectedRoute, updateUserProfile)

export default router
