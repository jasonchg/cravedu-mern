import path from 'path'
import multer from 'multer'

const maxSizeUpload = 300 * 1024 * 1024 //300MB MAX
const maxImageSize = 5 * 1024 * 1024 //5MB MAX

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `uploads/${req.params.id}`)
  },
  filename: function (req, file, cb) {
    cb(null, `/${file.fieldname}${path.extname(file.originalname)}`)
  },
})

const checkImageType = (file, cb) => {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Image Only!')
  }
}

const checkVideoFileType = (file, cb) => {
  const filetypes = /mp4|wmv|m4v|avi|mkv/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Video Only!')
  }
}

const uploadVideoContent = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkVideoFileType(file, cb)
  },
  limits: { fileSize: maxSizeUpload },
})

const uploadCourseImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkImageType(file, cb)
  },
  limits: { fileSize: maxImageSize },
})
export { uploadCourseImage, uploadVideoContent }
