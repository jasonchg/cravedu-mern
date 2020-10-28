import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Auth user & get json web token
// @route   GET /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  const matchedPassword = await user.matchPassword(password)

  if (user && matchedPassword) {
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
  const userId = req.user.id
  const user = await User.findById(userId)

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
  const { name, email, password } = req.body
  const userExisted = await User.findOne({ email })

  if (userExisted) {
    res.status(400)
    throw new Error('User already exists')
  }

  const createdUser = await User.create({
    name,
    email,
    password,
  })

  if (createdUser) {
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
})

export { authUser, getUserProfile, registerUser }
