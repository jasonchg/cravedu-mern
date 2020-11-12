import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'

// @desc    Get all courses
// @route   GET /api/admin/course
// @access  Private Admin

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({})

  if (courses) {
    res.json(courses)
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

export { getCourses }
