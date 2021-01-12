import fs from 'fs'

export const removeDir = (path) => {
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
