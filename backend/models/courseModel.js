import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    ratingStars: { type: Number, required: true, default: 0 },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const quizSchema = mongoose.Schema({
  question: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  incorrectAnswers: [{ type: String, required: true }],
})

const contentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    chapter: { type: String, required: true },
    video: { type: String, default: '' },
    duration: { type: String, default: '' },
    isPublished: { type: Boolean, default: false },
    quizzes: [quizSchema],
  },
  {
    timestamps: true,
  }
)

const answerThread = mongoose.Schema(
  {
    helpful: { type: Number, default: 0 },
    notHelpful: { type: Number, default: 0 },
    answer: { type: String, required: true },
    userName: { type: String, required: true },
    granted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    expireAfterSeconds: 1037000,
    partialFilterExpression: {
      granted: false,
    },
  }
)

const questionAskedSchema = mongoose.Schema(
  {
    question: { type: String },
    userName: { type: String },
    answers: [answerThread],
  },
  {
    timestamps: true,
  }
)

const announcement = mongoose.Schema(
  {
    announcementMessage: { type: String },
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
    slug: {
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
    studentCompleted: {
      type: Number,
      default: 0,
    },
    announcements: [announcement],
    category: { type: String, required: true },
    totalDuration: { type: String, required: true },
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
