import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    isInstructor: false,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    isInstructor: true,
  },
  {
    name: 'Jane Doe',
    email: 'Jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
