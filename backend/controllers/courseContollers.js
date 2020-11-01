import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'
import Order from '../models/orderModel.js'

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public

const getCourses = asyncHandler(async (req, res) => {
  // do not display the item that user had bought
  // const orders = await Order.find({})

  const courses = await Course.find({})

  if (courses) {
    res.json(courses)
  } else {
    res.status(404)
    throw new Error('Courses not found')
  }
})

// @desc    Fetch single course
// @route   GET /api/courses/:id
// @access  Public

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    res.json(course)
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

export { getCourses, getCourseById }
