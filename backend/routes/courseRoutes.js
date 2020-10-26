import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Course from '../models/courseModel.js'

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const courses = await Course.find({})
    if (courses) {
      res.json(courses)
    } else {
      res.status(404)
      throw new Error('Courses not found')
    }
  })
)

// @desc    Fetch single courses
// @route   GET /api/courses/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id)

    if (course) {
      res.json(course)
    } else {
      res.status(404)
      throw new Error('Course not found')
    }
  })
)

export default router
