import express from 'express'
import courses from './data/courses.js'
import connectDB from './config/db.js'
import morgan from 'morgan'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'

import userRoutes from './routes/userRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/courses', courseRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`))
