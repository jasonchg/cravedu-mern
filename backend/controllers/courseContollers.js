import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'

// @desc    Fetch all courses/ Search features
// @route   GET /api/courses
// @access  Public

const getCourses = asyncHandler(async (req, res) => {
  const params = req.query.keyword
    ? {
        isPublished: true,
        name: { $regex: req.query.keyword, $options: 'i' },
      }
    : { isPublished: true }

  const courses = await Course.find(params)

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
// @desc    Fetch single course
// @route   GET /api/courses/:slug
// @access  Public

const getCourseBySlug = asyncHandler(async (req, res) => {
  const course = await Course.find({ slug: req.params.slug })

  if (course) {
    res.json(course[0])
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

// @desc    Get Best sold Courses
// @route   GET /api/courses/bestsold
// @access  Private

const getBestCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({}).sort({ totalSold: -1 }).limit(3)
  res.json(courses)
})

// @desc    Review
// @route   POST /api/courses/:id/review
// @access  Private

const createCourseReview = asyncHandler(async (req, res) => {
  const { ratingStars, comment } = req.body

  const course = await Course.findById(req.params.id)

  if (course) {
    const alreadyReview = course.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReview) {
      res.status(400)
      throw new Error('Already reviewed.')
    }

    const review = {
      name: req.user.name,
      ratingStars,
      comment,
      user: req.user._id,
    }

    await course.reviews.push(review)

    course.numReviews = course.reviews.length

    // course.rating =
    //   course.reviews.reduce((acc, item) => item.rating + acc, 0) /
    //   course.reviews.length

    await course.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Course not found.')
  }
})

// @desc    Reply QandA
// @route   PUT /api/courses/:id/qanda
// @access  Private

export {
  getCourses,
  getCourseById,
  createCourseQandA,
  getBestCourses,
  createCourseReview,
  getCourseBySlug,
}
