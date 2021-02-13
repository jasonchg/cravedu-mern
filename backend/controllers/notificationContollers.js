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
// @route   PUT /api/notifications/:read
// @access  Private

const readNotificationById = asyncHandler(async (req, res) => {
  try {
    const notifications = await Notification.findById(req.params.read)

    if (notifications) {
      notifications.notification.read = true
      const result = notifications.save()
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
    const notifications = await Notification.findById(req.params.read)

    if (notifications) {
      const result = notifications.remove()
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

export { getNotificationById, readNotificationById, removeNotificationById }
