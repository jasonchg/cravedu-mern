import Notification from '../models/notificationModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Get notifications
// @route   PUT /api/notifications/:id
// @access  Private

const getNotificationById = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.params.id })
  if (notifications) {
    res.json(notifications)
  } else {
    res.status(404)
    throw new Error('Notification not found')
  }
})

// @desc    read a notification
// @route   PUT /api/notifications/:id/?:read
// @access  Private

const readNotificationById = asyncHandler(async (req, res) => {
  let notifications = await Notification.find({ user: req.params.id })

  if (notifications) {
    const noti = notifications.find(
      (x) => x.notification._id == req.params.read
    )

    if (noti.notification) {
      try {
        noti.notification.read = true

        console.log(noti.notification.read)

        await notifications.save()
      } catch (err) {
        res.status(500)
        throw new Error(err.message)
      }
    } else {
      res.status(404)
      throw new Error('Notification not found')
    }
  } else {
    res.status(404)
    throw new Error('Notification not found')
  }
})

// mark delete // clear all

export { getNotificationById, readNotificationById }
