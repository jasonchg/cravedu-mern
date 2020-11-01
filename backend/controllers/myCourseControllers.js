import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc    Fetch all courses
// @route   GET /api/mycourses
// @access  Private

const getMyCourses = asyncHandler(async (req, res) => {
  // do not display the item that user had bought
  // user:purchasedCourses:[{userModel}]

  const user = await User.findById(req.user.id)
  const { myCourses } = user

  if (user) {
    res.json(myCourses)
  } else {
    res.status(404)
    throw new Error('No Course Found')
  }
})

export { getMyCourses }
