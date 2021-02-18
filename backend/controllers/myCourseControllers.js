import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
<<<<<<< HEAD
import Course from '../models/courseModel.js'
=======
>>>>>>> f4a828b (initial)

// @desc    Fetch all courses
// @route   GET /api/mycourses
// @access  Private

const getMyCourses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  const { myCourses } = user

<<<<<<< HEAD
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

// @desc    Update User Paid Course
// @route   PUT /api/mycourses/:id
// @access  Private

const updateMyCourse = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  const course = await Course.findById(req.params.id)

  if (user) {
    if (course) {
      const { myCourses } = user
      const currentCourse = myCourses.find((x) => x._id == req.params.id)

      if (currentCourse) {
        let result = diff(course.courseContents, currentCourse.courseContents)

        console.log(result)

        // try {
        //   await user.save()
        // } catch (err) {
        //   res.status(500)
        //   throw new Error('Internal Server Error')
        // }
      } else {
        res.status(404)
        throw new Error('No Course Found')
      }
    }
=======
  if (user) {
    res.json(myCourses)
>>>>>>> f4a828b (initial)
  } else {
    res.status(404)
    throw new Error('No Course Found')
  }
})

<<<<<<< HEAD
export { getMyCourses, updateMyCourse }
=======
export { getMyCourses }
>>>>>>> f4a828b (initial)
