import express from 'express'
import { protectedRoute } from '../middlewares/authMiddlewares.js'
import {
  addOrderItems,
  getAllUserOrders,
  getOrderById,
} from '../controllers/orderControllers.js'

const router = express.Router()

router.route('/myorders').get(protectedRoute, getAllUserOrders)
router.route('/').post(protectedRoute, addOrderItems)
router.route('/:id').get(protectedRoute, getOrderById)

export default router
