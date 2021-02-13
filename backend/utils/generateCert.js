import path from 'path'
import Jimp from 'jimp'

const __dirname = path.resolve()
const cert = path.join(__dirname, 'certificates/template-cert.jpg')

const generateCert = async (user, course, certificateId) => {
  try {
    Jimp.read(cert, (err, cert) => {
      if (err) throw err

      cert.quality(60)
      let w = cert.bitmap.width
      let h = cert.bitmap.height
      let student = user.name
      let instructor = course.instructor
      let date = new Date().toLocaleDateString()
      let certId = certificateId
      let courseTitle = course.name
      let totalHours = course.totalDuration / 60
      let message = `(This is to certify that ${student} has succesfully completed ${courseTitle} of total ${
        Math.round(totalHours * 10) / 10
      } hours online course.)`
      let filePath = `certificates/${certId}.jpeg`

      Jimp.loadFont(Jimp.FONT_SANS_128_BLACK).then((font) => {
        let textW = Jimp.measureText(font, student)
        let textH = Jimp.measureTextHeight(font, student)
        cert.print(
          font,
          w / 2 - textW / 2,
          h / 2 - textH / 2 - 120,
          {
            text: student,
          },
          textW,
          textH
        )
        Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then((font) => {
          let mtextW = Jimp.measureText(font, message)
          let mtextH = Jimp.measureTextHeight(font, message)

          cert.print(
            font,
            w / 2 - mtextW / 2,
            h / 2 - mtextH / 2 + 80,
            {
              text: message,
            },
            mtextW,
            mtextH
          )

          let ptextW = Jimp.measureText(font, filePath)
          let ptextH = Jimp.measureTextHeight(font, filePath)

          cert.print(
            font,
            w / 2 - mtextW / 2 - 700,
            h / 2 - mtextH / 2 + 1200,
            {
              text: `URL: cravedu.com/${filePath}`,
            },
            ptextW + 1000,
            ptextH
          )

          // let idtextW = Jimp.measureText(font, certId)
          // let idtextH = Jimp.measureTextHeight(font, certId)
          // cert.print(
          //   font,
          //   w / 2 - idtextW / 2 - 1541,
          //   h / 2 - idtextH / 2 + 1160,
          //   {
          //     text: `Certificate ID: ${certId}`,
          //   },
          //   idtextW + 1000,
          //   idtextH
          // )

          Jimp.loadFont(Jimp.FONT_SANS_64_BLACK)
            .then((font) => {
              let textW = Jimp.measureText(font, instructor)
              let textH = Jimp.measureTextHeight(font, instructor)
              cert.print(
                font,
                w / 2 - textW / 2 - 685,
                h / 2 - textH / 2 + 410,
                {
                  text: instructor,
                },
                textW,
                textH
              )
              let dtextW = Jimp.measureText(font, date)
              let dtextH = Jimp.measureTextHeight(font, date)
              cert.print(
                font,
                w / 2 - dtextW / 2 + 685,
                h / 2 - dtextH / 2 + 410,
                {
                  text: date,
                },
                dtextW,
                dtextH
              )

              return cert
            })
            .then((cert) => {
              let file = path.join(__dirname, filePath)
              return cert.write(file)
            })
        })
      })
    })
  } catch (err) {
    console.log(err)
    return false
  }
}

export { generateCert }
