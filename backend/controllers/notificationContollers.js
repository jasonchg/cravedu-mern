import Notification from '../models/notificationModel.js'
import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'
import mongoose from 'mongoose'

// @desc    Get notifications
// @route   PUT /api/notifications/:id
// @access  Private

const getNotificationById = asyncHandler(async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.params.id }).sort(
      {
        _id: -1,
      }
    )
    if (notifications) {
      res.json(notifications)
    }
  } catch (error) {
    res.status(404)
    throw new Error('Notification not found')
  }
})

// @desc    read a notification
// @route   PUT /api/notifications/:read
// @access  Private

const readNotificationById = asyncHandler(async (req, res) => {
  try {
    const notifications = await Notification.find({
      'notification._id': req.params.read,
    })
    console.log(notifications[0])

    if (notifications) {
      notifications[0].notification.read = true
      const result = notifications[0].save()

      if (result) {
        res.send('Read')
      }
    } else {
      res.status(404)
      throw new Error('Notification not found')
    }
  } catch (err) {
    res.status(500)
    throw new Error(err)
  }
})

// @desc    delete a notification
// @route   DELETE /api/notifications/:read
// @access  Private

const removeNotificationById = asyncHandler(async (req, res) => {
  try {
    const notifications = await Notification.find({
      'notification._id': req.params.read,
    })

    if (notifications) {
      const result = notifications[0].remove()
      if (result) {
        res.send('Removed')
      }
    } else {
      res.status(404)
      throw new Error('Notification not found')
    }
  } catch (err) {
    res.status(500)
    throw new Error(err)
  }
})

// @desc    grant a qanda answer
// @route   PUT /api/notifications/grant/
// @access  Private

const grantCourseQandA = asyncHandler(async (req, res) => {
  try {
    const courseId = mongoose.Types.ObjectId(req.body.courseId)

    const course = await Course.findById(courseId)
    const qandaId = req.body.qandaId
    const answerId = req.body.answerId

    if (course) {
      let currentQanda = course.courseQASection.find((x) => x._id == qandaId)

      if (currentQanda !== {}) {
        const answer = currentQanda.answers.find((x) => x._id == answerId)
        answer.granted = true

        await course.save()

        res.status(201).json('Granted')
      } else {
        res.status(404)
        throw new Error('Q&A not found')
      }
    } else {
      res.status(404)
      throw new Error('Course not found')
    }
  } catch (err) {
    res.status(500)
    throw new Error(err.message)
  }
})

export {
  getNotificationById,
  readNotificationById,
  removeNotificationById,
  grantCourseQandA,
}
