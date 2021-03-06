import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import { generateCert } from '../utils/generateCert.js'
import Course from '../models/courseModel.js'
import { sendThisCertToMail } from '../utils/sendThisMail.js'
import { customAlphabet } from 'nanoid'
import path from 'path'
import {
  COURSE_COMPLETED,
  NEW_REGISTER_SURVEY,
} from './notificationConstants.js'
import Notification from '../models/notificationModel.js'

// @desc    Auth user & get json web token
// @route   GET /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isInstructor: user.isInstructor,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Inalid Email or Password')
  }
})

// @desc    Get User Profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isInstructor: user.isInstructor,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Register a user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, instructor } = req.body
    const userExisted = await User.findOne({ email })

    if (userExisted) {
      res.status(400)
      throw new Error('User already exists')
    }

    let type = instructor.toLowerCase() === 'student' ? false : true

    const createdUser = await User.create({
      name,
      email,
      password,
      isInstructor: type,
    })

    if (createdUser) {
      const newNotification = new Notification({
        user: createdUser._id,
        notification: {
          title: NEW_REGISTER_SURVEY,
          from: `https://docs.google.com/forms/d/e/1FAIpQLSfUprTbIQDFkYALUD6Q_hNylZEwHsFSGC3c1oasDR9N6-lrTQ/viewform`,
          message: `From Cravedu`,
          read: false,
        },
      })

      await newNotification.save()

      res.json({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        isInstructor: createdUser.isInstructor,
        token: generateToken(createdUser._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid User Data')
    }
  } catch (err) {
    res.status(500)
    throw new Error('Internal Server Error')
  }
})

// @desc    Update a user profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const userExisted = await User.findById(req.user.id)

  if (userExisted) {
    userExisted.name = req.body.name || userExisted.name
    userExisted.email = req.body.email || userExisted.email
    if (req.body.password) {
      userExisted.password = req.body.password || userExisted.password
    }
  }

  const updatedUserProfile = await userExisted.save()

  if (updatedUserProfile) {
    res.json({
      _id: updatedUserProfile._id,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      isAdmin: updatedUserProfile.isAdmin,
      isInstructor: updatedUserProfile.isInstructor,
      token: generateToken(updatedUserProfile._id),
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

// @desc    Update Complete Status & Generate Certificate
// @route   PUT /api/users/:courseId/course-completed
// @access  Private

const completeCourse = asyncHandler(async (req, res) => {
  try {
    const userExisted = await User.findById(req.user.id)
    const courseId = req.params.courseId
    const course = await Course.findById(courseId)

    const nanoid = customAlphabet(
      course
        ? course.name.trim().toLowerCase().replace(/\s/g, '')
        : '1234567890abcdef',
      10
    )
    const certificateId = `cert-${nanoid()}`

    if (userExisted) {
      const getCompletedCourse = userExisted.myCourses.find(
        (x) => x._id == courseId
      )
      if (getCompletedCourse || course) {
        if (
          getCompletedCourse &&
          getCompletedCourse.completedCertificate &&
          getCompletedCourse.completedCertificate !== ' '
        ) {
          res.status(400)
          throw new Error('Course already has a completed certificate')
        } else {
          generateCert(userExisted, course, certificateId)

          let filename = `${certificateId}.jpeg`
          let uri = path.join('certificates', filename)

          getCompletedCourse.completedCertificate = uri || ''
          const result = userExisted.save()

          if (result) {
            course.studentCompleted = Number(course.studentCompleted) + 1

            const newNotification = new Notification({
              user: req.user.id,
              notification: {
                title: COURSE_COMPLETED,
                from: `Congratulation, You have completed an online course named, ${course.name}.`,
                message: `From ${req.user.name}`,
                read: false,
                certUrl: uri,
              },
            })

            const notification = await newNotification.save()
            const courseResult = await course.save()
            const email = await sendThisCertToMail(userExisted, course, {
              url: `${uri}`,
              path: uri,
              filename,
              name: course.name,
              totalDuration: course.totalDuration,
            })
            if (notification && courseResult && email) {
              res.status(201).send({
                certCreated: 'true',
              })
            }
          }
        }
      } else {
        res.status(404)
        throw new Error('Course Not Found')
      }
    } else {
      res.status(404)
      throw new Error('User Not Found')
    }
  } catch (err) {
    res.status(500)
    console.log(err.message)
  }
})

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  completeCourse,
}
