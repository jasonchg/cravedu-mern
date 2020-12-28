import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'

// @desc    Get All Course That Created by this intructor
// @route   GET /api/instructor/courses
// @access  Private

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({
    user: req.user._id,
  }).sort({ isPublished: 'desc' })

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
    slug: 'my-new-course-123',
    image: '/uploads/sample.jpg',
    description: 'New Course',
    instructor: req.user.name,
    isPublished: false,
    rating: 0,
    numReviews: 0,
    totalSold: 0,
    price: 0,
    totalDuration: '0',
    annoucement: 'There is no annoucement for this course',
  })

  try {
    const createdCourse = await course.save()
    res.status(201).json(createdCourse._id)
  } catch (e) {
    res.status(500)
    throw new Error('Internal Error with this one, please try again later.')
  }
})

// @desc    Get a course details
// @route   PUT /api/instructor/courses/:id
// @access  Private

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    res.json(course)
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

// @desc    Update a course content
// @route   PUT /api/instructor/courses/:id
// @access  Private

const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    course.name = req.body.name || course.name
    course.image = req.body.image || course.image
    course.price = req.body.price || course.price
    course.description = req.body.description || course.description

    try {
      const courseUpdated = await course.save()
      res.json({
        _id: courseUpdated._id,
        name: courseUpdated.name,
        image: courseUpdated.image,
        price: courseUpdated.price,
        description: courseUpdated.description,
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

// @desc    Add a course content
// @route   POST /api/instructor/courses/:id/addcontent
// @access  Private

const addCourseContent = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    try {
      const newContent = {
        chapter: req.body.chapter,
        name: req.body.name,
      }

      course.courseContents.push(newContent)
      const newlyAddedContent = await course.save()

      res.status(201).json({ newlyAddedContent })
    } catch (e) {
      res.status(401)
      throw new Error('Something went wrong.')
    }
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

// @desc    Delete a course
// @route   DELETE /api/instructor/courses/:id
// @access  Private

export {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  addCourseContent,
}
