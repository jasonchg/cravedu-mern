import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private Admin

const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find({}, { password: 0 })

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User has been removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user details
// @route   GET /api/admin/users/:id
// @access  Private Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id, { password: 0 })

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user details
// @route   PUT /api/admin/users/:id
// @access  Private Admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    user.isInstructor = req.body.isInstructor

    try {
      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isInstructor: updatedUser.isInstructor,
      })
    } catch (e) {
      res.status(401)
      throw new Error('Something went wrong.')
    }
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { getUsers, deleteUser, getUserById, updateUser }
