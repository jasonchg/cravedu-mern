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

// @desc    Get a course
// @route   GET /api/admin/course/:id
// @access  Private Admin

const getCourseById = asyncHandler(async (req, res) => {
  const courses = await Course.findById(req.params.id)

  if (courses) {
    res.json(courses)
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

export { getCourses, getCourseById }
