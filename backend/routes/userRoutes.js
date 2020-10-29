import express from 'express'
const router = express.Router()
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userControllers.js'
import { protectedRoute } from '../middlewares/authMiddlewares.js'

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router
  .route('/profile')
  .get(protectedRoute, getUserProfile)
  .put(protectedRoute, updateUserProfile)

export default router
