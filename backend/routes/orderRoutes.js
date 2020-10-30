import express from 'express'
const router = express.Router()
import { addOrderItems } from '../controllers/orderControllers.js'
import { protectedRoute } from '../middlewares/authMiddlewares.js'

router.route('/').post(protectedRoute, addOrderItems)

export default router
