import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'
import Course from '../models/courseModel.js'
import User from '../models/userModel.js'

// @desc    Fetch all courses/ Search features
// @route   GET /api/courses
// @access  Public

const getCourses = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const params = req.query.keyword
    ? {
        isPublished: true,
        name: { $regex: req.query.keyword, $options: 'i' },
      }
    : { isPublished: true }

  const count = await Course.countDocuments(params)
  const courses = await Course.find(params)
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
    throw new Error('Courses not found')
  }
})

// @desc    Fetch all courses by category
// @route   GET /api/courses/category?category=
// @access  Public

const getCoursesByCategory = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const params = req.query.category
    ? {
        isPublished: true,
        category: { $regex: req.query.category, $options: 'i' },
      }
    : { category: '' }

  const count = await Course.countDocuments(params)
  const courses = await Course.find(params)
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

// @desc    Fetch All Categories
// @route   GET /api/courses/categories
// @access  Public

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find()

  if (categories) {
    res.json(categories)
  } else {
    res.status(404)
    throw new Error('Category not found')
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

// @desc    Reply QandA
// @route   PUT /api/courses/:id/qanda/:qandaId
// @access  Private

const replyCourseQandA = asyncHandler(async (req, res) => {
  const qandaId = req.params.qandaId

  const course = await Course.findById(req.params.id)

  if (course) {
    try {
      let currentQanda = course.courseQASection.find((x) => x._id == qandaId)

      if (currentQanda !== {} && currentQanda.answers.length !== 0) {
        const answer = {
          helpful: 0,
          notHelpful: 0,
          granted: false,
          answer: req.body.answer,
          userName: req.body.userName,
        }

        currentQanda.answers.push(answer)

        const updateQanda = await course.save()
        res.status(201).json({ updateQanda })
      } else {
        res.status(404)
        throw new Error('Q&A not found')
      }
    } catch (err) {
      res.status(404)
      throw new Error('Course not found', err.message)
    }
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

// @desc    Set Watched
// @route   PUT /api/courses/:id/watch
// @access  Private

const setWatched = asyncHandler(async (req, res) => {
  const { chapterId, watched } = req.body
  const courseId = req.params.id
  const user = await User.findById(req.user.id)
  if (user) {
    const currentCourse = user.myCourses.find((x) => x._id == courseId)
    const currentContent = currentCourse.courseContents.find(
      (y) => y.chapterId == chapterId
    )
    currentContent.watched = watched

    const updateContent = await user.save()
    if (updateContent) {
      res.send('Content Updated')
    } else {
      res.status(500)
      throw new Error('Please try again')
    }
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  getCourses,
  getCourseById,
  createCourseQandA,
  getBestCourses,
  createCourseReview,
  getCourseBySlug,
  setWatched,
  getCategories,
  getCoursesByCategory,
  replyCourseQandA,
}
