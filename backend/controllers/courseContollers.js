import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public

const getCourses = asyncHandler(async (req, res) => {
  // do not display the item that user had bought

  const courses = await Course.find({ isPublished: true })

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

// @desc    Create QandA
// @route   POST /api/courses/:id/qanda
// @access  Private

const createCourseQandA = asyncHandler(async (req, res) => {
  const { question } = req.body

  const course = await Course.findById(req.params.id)

  if (course) {
    const qanda = {
      userName: req.user.name,
      question,
      user: req.user._id,
    }

    course.courseQASection.push(qanda)

    const posted = await course.save()
    res.status(201).json({ posted })
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

export { getCourses, getCourseById, createCourseQandA }
