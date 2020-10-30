import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Add New Order
// @route   POST /api/orders
// @access  Private

const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, paymentMethod, itemPrice, totalPrice, isPaid } = req.body

  if (!orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order item!')
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      paymentMethod,
      itemPrice,
      totalPrice,
      isPaid,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

export { addOrderItems }
