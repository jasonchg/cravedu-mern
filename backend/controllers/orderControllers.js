import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'

// @desc    Add New Order
// @route   POST /api/orders
// @access  Private

const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, paymentMethod, itemPrice, totalPrice, isPaid } = req.body

  const userExisted = await User.findById(req.user.id)

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

    if (userExisted) {
      var newMyCourses = userExisted.myCourses

      for (var key in orderItems) {
        newMyCourses = [
          ...newMyCourses,
          {
            _id: orderItems[key].course,
            image: orderItems[key].image,
            name: orderItems[key].name,
          },
        ]
      }

      userExisted.myCourses = newMyCourses
    }

    const updatedUserProfile = await userExisted.save()
    const createdOrder = await order.save()

    res.status(201).json({ createdOrder, updatedUserProfile })
  }
})

// @desc    Get order by Id
// @route   GET /api/orders/:id
// @access  Private

const getOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.id
  const order = await Order.findById(orderId).populate('user', 'name email')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get all user purchased courses
// @route   GET /api/mycourses
// @access  Private

const getAllUserOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
    res.json(orders)
  } catch (e) {
    res.status(404)
    throw new Error('No order found')
  }
})

export { addOrderItems, getOrderById, getAllUserOrders }
