import connectDB from './config/db.js'
import dotenv from 'dotenv'
import Course from './models/courseModel.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import colors from 'colors'
import users from './data/users.js'
import courses from './data/courses.js'
import Category from './models/categoryModel.js'
import categories from './data/categories.js'
import Notification from './models/notificationModel.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await Course.deleteMany()
    await User.deleteMany()
    await Order.deleteMany()
    await Category.deleteMany()
    await Notification.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleCourses = courses.map((course) => {
      return { ...course, user: adminUser }
    })

    await Category.insertMany(categories)
    await Course.insertMany(sampleCourses)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (e) {
    console.error(`${e}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Course.deleteMany()
    await User.deleteMany()
    await Order.deleteMany()
    await Category.deleteMany()
    await Notification.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (e) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
