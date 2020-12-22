import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'
import Course from '../models/courseModel.js'

// @desc    Add New Order
// @route   POST /api/orders
// @access  Private

const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, paymentMethod, itemPrice, totalPrice, isPaid } = req.body
  const userExisted = await User.findById(req.user.id)

  try {
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
      const orderId = createdOrder._id

      if (userExisted) {
        var newMyCourses = userExisted.myCourses

        for (var key in orderItems) {
          newMyCourses = [
            ...newMyCourses,
            {
              _id: orderItems[key].course,
              image: orderItems[key].image,
              name: orderItems[key].name,
              slug: orderItems[key].slug,
              orderId,
              completedCertificate: '',
            },
          ]

          Course.findOneAndUpdate(
            {
              _id: orderItems[key].course,
            },
            {
              $inc: {
                totalSold: 1,
              },
            },
            (e) => {
              console.error(e)
            }
          )
        }

        userExisted.myCourses = newMyCourses

        await userExisted.save()

        res.status(201).json({ createdOrder })
      }
    }
  } catch (e) {
    res.status(500)
    throw new Error(e)
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
