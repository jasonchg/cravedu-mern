import Notification from '../models/notificationModel.js'
import asyncHandler from 'express-async-handler'
// @desc    Get a course details
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

export { getNotificationById }
