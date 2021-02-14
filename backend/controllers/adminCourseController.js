import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'
import {
  COURSE_PUBLISHED,
  COURSE_UNPUBLISHED,
} from './notificationConstants.js'
import Notification from '../models/notificationModel.js'

// @desc    Get all courses
// @route   GET /api/admin/course
// @access  Private Admin

const getCourses = asyncHandler(async (req, res) => {
  const pageSize = 9
  const page = Number(req.query.pageNumber) || 1
  const count = await Course.countDocuments({})
  const courses = await Course.find({})
    .sort({ isPublished: 'desc' })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  if (courses) {
    res.json({
      courses,
      page,
      pages: Math.ceil(count / pageSize),
    })
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

// @desc    Get a course
// @route   GET /api/admin/course/:id
// @access  Private Admin

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    res.json(course)
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

// @desc    Update course details
// @route   PUT /api/admin/course/:id
// @access  Private Admin

const updateCourse = asyncHandler(async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (course) {
      course.name = req.body.name || course.name
      course.image = req.body.image || course.image
      course.price = req.body.price || course.price
      course.category = req.body.category || course.category
      course.description = req.body.description || course.description
      course.instructor = req.body.instructor || course.instructor
      course.isPublished = req.body.isPublished

      if (req.body.isPublished && req.body.isPublished === true) {
        const newNotification = new Notification({
          user: course.user,
          notification: {
            title: COURSE_PUBLISHED,
            from: `Congratulation, your course named, ${course.name} has been published to the marketplace.`,
            message: `From ${req.user.name}`,
            read: false,
          },
        })
        await newNotification.save()
      }

      // if (req.body.isPublished && req.body.isPublished === false) {
      //   const newNotification = new Notification({
      //     user: course.user,
      //     notification: {
      //       title: COURSE_UNPUBLISHED,
      //       from: `Unfortunately, your course named, ${course.name} has been taken down from the marketplace.`,
      //       message: `From ${req.user.name}`,
      //       read: false,
      //     },
      //   })
      //   await newNotification.save()
      // }

      const courseUpdated = await course.save()
      res.json({
        _id: courseUpdated._id,
        name: courseUpdated.name,
        image: courseUpdated.image,
        price: courseUpdated.price,
        category: courseUpdated.category,
        description: courseUpdated.description,
        instructor: courseUpdated.instructor,
        isPublished: courseUpdated.isPublished,
      })
    } else {
      res.status(404)
      throw new Error('Course not found')
    }
  } catch (e) {
    res.status(401)
    throw new Error('Something went wrong.')
  }
})

export { getCourses, getCourseById, updateCourse }
