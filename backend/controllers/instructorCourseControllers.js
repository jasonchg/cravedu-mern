import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'

// @desc    Get All Course That Created by this intructor
// @route   GET /api/instructor/courses
// @access  Private

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({
    user: req.user._id,
  })

  if (courses) {
    res.json(courses)
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

// @desc    Create a new course
// @route   POST /api/instructor/courses
// @access  Private
const createCourse = asyncHandler(async (req, res) => {
  const course = new Course({
    user: req.user._id,
    name: 'My New Course',
    image: '/uploads/sample.jpg',
    description: 'New Course',
    instructor: req.user.name,
    isPublished: false,
    rating: 0,
    numReviews: 0,
    totalSold: 0,
    price: 0,
    annoucement: 'There is no annoucement for this course',
  })

  try {
    const createdCourse = await course.save()
    res.status(201).json(createdCourse)
  } catch (e) {
    res.status(500)
    throw new Error('Internal Error with this one, please try again later.')
  }
})

// @desc    Update a course
// @route   PUT /api/instructor/courses/:id
// @access  Private

// @desc    Update a course content
// @route   PUT /api/instructor/courses/:id/contents
// @access  Private

// @desc    Delete a course
// @route   DELETE /api/instructor/courses/:id
// @access  Private

export { createCourse, getCourses }
