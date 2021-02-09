import express from 'express'
import path from 'path'
import courses from './data/courses.js'
import connectDB from './config/db.js'
import morgan from 'morgan'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'

import userRoutes from './routes/userRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import myCourseRoutes from './routes/myCourseRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import adminCourseRoutes from './routes/adminCourseRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import instructorRoutes from './routes/instructorRoutes.js'
import instructorContentRoutes from './routes/instructorContentRoutes.js'

// Config & Initialization
dotenv.config()
connectDB()
const app = express()
app.use(express.json())
app.use(morgan('dev'))

// Default End Points
app.use('/api/courses', courseRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/mycourses', myCourseRoutes)
app.use('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})
app.use('/api/upload/', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Admin Routes
app.use('/api/admin/users', adminRoutes)
app.use('/api/admin/courses', adminCourseRoutes)

// Instructor Routes
app.use('/api/instructor/courses', instructorContentRoutes)
app.use('/api/instructor/courses', instructorRoutes)

// Error Handling
app.use(notFound)
app.use(errorHandler)

// ONLY RUN ON PRODUCTION BUILD //
if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running')
  })
}

// Listener
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`))
