import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private Admin

const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find({})

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
  const user = await User.findById(req.params.id)

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { getUsers, deleteUser, getUserById }
