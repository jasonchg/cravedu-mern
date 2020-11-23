import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const contentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    chapter: { type: String, required: true },
    video: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const questionAskedSchema = mongoose.Schema(
  {
    question: { type: String },
    answer: { type: String },
    userName: { type: String },
  },
  {
    timestamps: true,
  }
)

const courseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    annoucement: {
      type: String,
    },
    reviews: [reviewSchema],
    courseContents: [contentSchema],
    courseQASection: [questionAskedSchema],
  },
  {
    timestamps: true,
  }
)

const Course = mongoose.model('Course', courseSchema)

export default Course
