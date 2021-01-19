import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import dotenv from 'dotenv'
dotenv.config()
const oAuth2Cient = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
)
oAuth2Cient.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })
console.log(process.env.REFRESH_TOKEN)

const sendThisMail = async (user, content) => {
  try {
    const accessToken = await oAuth2Cient.getAccessToken()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.SENDER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken,
      },
    })

    const mailOptions = {
      from: '"Cravedu 👻" <sales@cravedu.com>',
      to: `${user.email}`,
      subject: `Thank you ${user.name} for purchase course name ${content.name} from Cravedu !!`,
      text: `This is your invoice.<br> ${content}`,
      html: `${content}`,
    }

    await transporter.sendMail(mailOptions, (err) => {
      console.error(err)
    })
  } catch (error) {
    console.log(error)
  }
}

sendThisMail()
  .then((result) => console.log('Email sent...', result))
  .catch((err) => console.log('Email not sent...', err))

export { sendThisMail }
