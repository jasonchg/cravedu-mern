import fs from 'fs'

const removeDir = (path) => {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path)

    if (files.length > 0) {
      files.forEach(function (filename) {
        if (fs.statSync(path + '/' + filename).isDirectory()) {
          removeDir(path + '/' + filename)
        } else {
          fs.unlinkSync(path + '/' + filename)
        }
      })
      fs.rmdirSync(path)
      return true
    } else {
      fs.rmdirSync(path)
      return true
    }
  } else {
    console.log('Directory path not found.')
    return false
  }
}

const removeFile = (path) => {
  try {
    fs.unlinkSync(path)
    return true
  } catch (err) {
    console.log('Directory path not found.')
    return true
  }
}

export { removeDir, removeFile }
