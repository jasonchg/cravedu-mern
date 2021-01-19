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

    if (content) {
      let orderItems = content.orderItems
        .map(
          (item, index) =>
            `<tr><td>${index + 1}. ${item.name}</td><td>RM ${
              item.price
            }</td></tr>`
        )
        .join('')

      let orderDate = content.createdAt

      const html = `<div></div><h3>Invoice</h3><table><tr><td>Invoice Id:</td> <td>${content._id}</td></tr><tr><td>Paid At:</td><td>${orderDate}</td></tr></table><p>Order Items</p><table>${orderItems}</table><div > <h4>Total: RM ${content.totalPrice}</h4></div>`

      const mailOptions = {
        from: '"Cravedu 👻" <sales@cravedu.com>',
        to: `${user.email}`,
        subject: `Thank you ${user.name} for purchase course from Cravedu.com !`,
        text: `This is your invoice. ID: ${content._id}`,
        html,
      }

      await transporter.sendMail(mailOptions)
    } else {
      return console.log('Email not sent...')
    }
  } catch (error) {
    console.log(error)
  }
}

sendThisMail()

export { sendThisMail }
