import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const courseContentsSchema = mongoose.Schema({
  chapter: {
    type: String,
    required: true,
  },
  progress: {
    type: Boolean,
    default: false,
    required: true,
  },
})

const myCoursesSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
  slug: {
    type: String,
    required: true,
    ref: 'Course',
  },
  image: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  courseContents: [courseContentsSchema],
  finishedAt: {
    type: Date,
  },
  completedCertificate: {
    type: String,
  },
})

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isInstructor: {
      type: Boolean,
      required: true,
      default: false,
    },
    myCourses: [myCoursesSchema],
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
