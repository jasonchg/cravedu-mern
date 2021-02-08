import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc    Fetch all courses
// @route   GET /api/mycourses
// @access  Private

const getMyCourses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  const { myCourses } = user

  let newList = []

  for (let key in myCourses) {
    if (myCourses[key].completedCertificate !== '') {
      newList = [...newList, myCourses[key]]
    } else {
      newList = [myCourses[key], ...newList]
    }
  }

  if (user) {
    res.json(newList)
  } else {
    res.status(404)
    throw new Error('No Course Found')
  }
})

export { getMyCourses }
