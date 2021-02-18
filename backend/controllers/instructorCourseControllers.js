import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'
import fs from 'fs'
import { removeDir, removeFile } from '../utils/deleteFolder.js'
import path from 'path'
<<<<<<< HEAD
import Notification from '../models/notificationModel.js'
import User from '../models/userModel.js'
import {
  NEW_COURSE_PUBLISH,
  COURSE_ANNOUNCEMENT,
} from './notificationConstants.js'
import mongoose from 'mongoose'
=======
>>>>>>> f4a828b (initial)

// @desc    Get All Course That Created by this intructor
// @route   GET /api/instructor/courses
// @access  Private

const getCourses = asyncHandler(async (req, res) => {
  const pageSize = 9
  const page = Number(req.query.pageNumber) || 1

  const count = await Course.countDocuments({ user: req.user._id })
  const courses = await Course.find({
    user: req.user._id,
  })
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

// @desc    Create a new course
// @route   POST /api/instructor/courses
// @access  Private
const createCourse = asyncHandler(async (req, res) => {
  const course = new Course({
    user: req.user._id,
    name: 'My New Course',
    slug: `my-new-course-${Math.random().toString(36).substring(7)}`,
    image: '/uploads/sample.jpg',
    description: 'New Course',
    instructor: req.user.name,
    isPublished: false,
    category: 'Web Development',
    rating: 0,
    numReviews: 0,
    totalSold: 0,
    price: 0,
<<<<<<< HEAD
    studentCompleted: 0,
    totalDuration: '0',
    annoucements: [],
=======
    totalDuration: '0',
    annoucement: 'There is no annoucement for this course',
>>>>>>> f4a828b (initial)
  })

  try {
    const createdCourse = await course.save()
    let dir = `./uploads/${createdCourse._id}/`
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    res.status(201).json(createdCourse._id)
  } catch (e) {
    res.status(500)
    throw new Error(e.message)
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

// @desc    Update a course details
// @route   PUT /api/instructor/courses/:id
// @access  Private

const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    course.name = req.body.name || course.name
    course.slug = req.body.slug || course.slug
    course.image = req.body.image || course.image
    course.price = req.body.price || course.price
    course.category = req.body.category || course.category
    course.description = req.body.description || course.description

    try {
      const courseUpdated = await course.save()
      res.json({
        _id: courseUpdated._id,
        name: courseUpdated.name,
        slug: courseUpdated.slug,
        image: courseUpdated.image,
        category: courseUpdated.category,
        price: courseUpdated.price,
        description: courseUpdated.description,
      })
    } catch (e) {
      res.status(401)
      throw new Error('Something went wrong')
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
        video: '',
        duration: '',
        quizzes: [],
      }

      course.courseContents.push(newContent)
      const newlyAddedContent = await course.save()

      res.status(201).json({ newlyAddedContent })
    } catch (e) {
      res.status(401)
      throw new Error('Something went wrong')
    }
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

// @desc    Update a course content
// @route   PUT /api/instructor/courses/:id/updatecontent
// @access  Private

const updateContent = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    let courseContents = course.courseContents

    let content = courseContents.find((x) => x.id === req.body.contentId)

    if (content) {
      content.name = req.body.name || content.name
      content.chapter = req.body.chapter || content.chapter
      content.video = req.body.video || content.video
      content.duration = req.body.duration || content.duration
      content.isPublished = req.body.isPublished

      try {
        await course.save()
        res.json({ message: 'Content updated.' })
      } catch (e) {
        res.status(401)
        throw new Error('Something went wrong')
      }
    }
  } else {
    res.status(404)
    throw new Error('Content not found')
  }
})

// @desc    Update a course content quizzes
// @route   PUT /api/instructor/courses/:id/updatecontentquizzes/
// @access  Private

const updateContentQuizzes = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
  const quizId = req.body.quizId || ''

  if (course) {
    let courseContents = course.courseContents
    let content = courseContents.find((x) => x.id === req.body.contentId)

    if (content) {
      let quizzes = content.quizzes.length > 0 ? content.quizzes : []
      if (quizzes.length > 0 || quizId != '') {
        let currentQuiz = quizzes.find((y) => y._id == quizId)
        if (currentQuiz) {
          currentQuiz.question = req.body.question || currentQuiz.question
          currentQuiz.correctAnswer =
            req.body.correctAnswer || currentQuiz.correctAnswer
          currentQuiz.incorrectAnswers =
            req.body.incorrectAnswers || currentQuiz.incorrectAnswers
        } else {
          let newQuiz = {
            question: req.body.question,
            correctAnswer: req.body.correctAnswer,
            incorrectAnswers: req.body.incorrectAnswers,
          }

          content.quizzes.push(newQuiz)
        }
      }
      try {
        await course.save()
        res.json(content.quizzes)
      } catch (e) {
        res.status(500)
        throw new Error('Something went wrong')
      }
    }
  } else {
    res.status(404)
    throw new Error('Content not found')
  }
})

// @desc    Get a content quizzes
// @route   PUT /api/instructor/courses/:id/contentquizzes/
// @access  Private

const getContentQuizzes = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    let courseContents = course.courseContents
    let content = courseContents.find((x) => x.id === req.body.contentId)

    if (content) {
      let quizzes = content.quizzes.length > 0 ? content.quizzes : []
      res.json({ quizzes })
    } else {
      res.status(404)
      throw new Error('Quiz not found')
    }
  } else {
    res.status(404)
    throw new Error('Content not found')
  }
})

// @desc    delete a course content quizz
// @route   Delete /api/instructor/courses/:id/:contentId/:quizId/deletequiz
// @access  Private

const deleteContentQuizzes = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
  const contentId = req.params.contentId || ''
  const quizId = req.params.quizId || ''

  if (course) {
    let courseContents = course.courseContents
    let content = courseContents.find((x) => x.id === contentId)
    if (content) {
      let quizzes = content.quizzes.length > 0 ? content.quizzes : []
      if (quizzes.length > 0 || quizId != '') {
        let currentQuiz = quizzes.find((y) => y._id == quizId)
        if (currentQuiz) {
          currentQuiz.remove()
        } else {
          res.status(404)
          throw new Error('Quiz not found')
        }
      }
      try {
        const newCourseContentQuizzes = await course.save()
        if (newCourseContentQuizzes) {
          let newContent = newCourseContentQuizzes.courseContents.find(
            (x) => x.id === contentId
          )

          res.json(newContent.quizzes)
        }
      } catch (e) {
        res.status(500)
        throw new Error('Something went wrong')
      }
    }
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

// @desc    Delete a course
// @route   DELETE /api/instructor/courses/:id
// @access  Private

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  const __dirname = path.resolve()

  if (course) {
    try {
      const removedDir = removeDir(
        path.join(__dirname, `/uploads/${course._id}`)
      )
      const removedCourse = await course.remove()

      if (removedCourse) {
        if (removedDir) {
          res.json({ message: 'Course deleted successfully' })
        }
      }
    } catch (e) {
      res.status(401)
      throw new Error('Something went wrong')
    }
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

// @desc    Delete a content
// @route   DELETE /api/instructor/courses/:id/content
// @access  Private

const deleteContent = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  const __dirname = path.resolve()
  const courseContents = course.courseContents

  if (course) {
    let content = courseContents.find((x) => x.id === req.params.contentId)

    if (content) {
      try {
        const removedDir = removeFile(path.join(__dirname, content.video))

        const removedContent = await content.remove()
        if (removedContent) {
          if (removedDir) {
            await course.save()
            res.json({ message: 'Content delete successfully' })
          }
        }
      } catch (e) {
        res.status(401)
        throw new Error(e)
      }
    } else {
      res.status(404)
      throw new Error('Content not found')
    }
  } else {
    res.status(404)
    throw new Error('Content not found')
  }
})

<<<<<<< HEAD
// @desc    Request Publish
// @route   PUT /api/instructor/courses/:id
// @access  Private

const requestPublishCourse = asyncHandler(async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    const adminUser = await User.find({ isAdmin: true })

    if (course && adminUser) {
      const newNotification = new Notification({
        user: adminUser[0]._id,
        notification: {
          title: NEW_COURSE_PUBLISH,
          from: `I wish to publish this course named, ${course.name}.`,
          message: `From ${req.user.name}`,
          read: false,
        },
      })
      await newNotification.save()
      res.send('Sent')
    }
  } catch (error) {
    res.status(500)
    throw new Error('Internal Server Error')
  }
})

// @desc    Send Announcement
// @route   POST /api/instructor/courses/:id/announcement
// @access  Private

const sendCourseAnnouncement = asyncHandler(async (req, res) => {
  try {
    const course = await Course.findById(mongoose.Types.ObjectId(req.params.id))
    const users = await User.find()

    if (course) {
      const newMsg = {
        announcementMessage: req.body.announcementMessage,
      }

      course.announcements.push(newMsg)
      await course.save()

      const getAllUsers = users.filter((x) =>
        x.myCourses.some((y) => y._id == req.params.id)
      )

      if (getAllUsers && getAllUsers.length > 0) {
        for (let key in getAllUsers) {
          const newNotification = new Notification({
            user: mongoose.Types.ObjectId(getAllUsers[key]._id),
            notification: {
              title: COURSE_ANNOUNCEMENT,
              from: `${req.body.announcementMessage}`,
              message: `From ${course.instructor} ( ${course.name} )`,
              read: false,
            },
          })

          await newNotification.save()
        }
      }
      res.send('Sent to all users')
    }
  } catch (err) {
    res.status(500)
    throw new Error(err)
  }
})

=======
>>>>>>> f4a828b (initial)
export {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  addCourseContent,
  updateContent,
  deleteCourse,
  deleteContent,
  updateContentQuizzes,
  getContentQuizzes,
  deleteContentQuizzes,
<<<<<<< HEAD
  requestPublishCourse,
  sendCourseAnnouncement,
=======
>>>>>>> f4a828b (initial)
}
