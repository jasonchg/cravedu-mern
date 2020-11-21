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

// @desc    Update course details
// @route   PUT /api/admin/course/:id
// @access  Private Admin

const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    course.name = req.body.name || course.name
    course.image = req.body.image || course.image
    course.name = req.body.name || course.name
    course.description = req.body.description || course.description
    course.instructor = req.body.instructor || course.instructor
    course.isPublished = course.isPublished

    try {
      const courseUpdated = await course.save()
      res.json({
        _id: courseUpdated._id,
        name: courseUpdated.name,
        image: courseUpdated.image,
        description: courseUpdated.description,
        instructor: courseUpdated.instructor,
        isPublished: courseUpdated.isPublished,
      })
    } catch (e) {
      res.status(401)
      throw new Error('Something went wrong.')
    }
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

export { getCourses, getCourseById, updateCourse }
