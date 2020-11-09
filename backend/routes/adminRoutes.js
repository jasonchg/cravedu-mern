import express from 'express'

import { getUsers } from '../controllers/userControllers.js'
import { protectedRoute, adminRoute } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route('/').get(protectedRoute, adminRoute, getUsers)

export default router
