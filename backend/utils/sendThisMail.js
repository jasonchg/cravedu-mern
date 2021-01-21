import nodemailer from 'nodemailer'
import path from 'path'
import { google } from 'googleapis'
import dotenv from 'dotenv'
dotenv.config()
const oAuth2Cient = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
)
oAuth2Cient.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

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

    let orderItems = content
      ? content.orderItems.length > 1
        ? content.orderItems
            .map(
              (item, index) =>
                `<tr><td>${index + 1}. ${item.name}</td><td>RM ${
                  item.price
                }</td></tr>`
            )
            .join('')
        : `<tr><td>${1}. ${content.orderItems[0].name}</td><td>RM ${
            content.orderItems[0].price
          }</td></tr>`
      : ''

    let orderDate = content ? content.createdAt : ''

    const html = `<div style='text-align:center; background:#eee;' ><img src='cid:logo@cravedu.com' style='width:90px; padding:20px;'/></div><h3>Invoice</h3><table><tr><td>Invoice Id:</td> <td>${
      content ? content._id : ''
    }</td></tr><tr><td>Paid At:</td><td>${orderDate}</td></tr></table><p>Order Items</p><table>${orderItems}</table><div> <h4>Total: RM ${
      content ? content.totalPrice : ''
    }</h4></div><br><hr><p style='text-align:center'>This is an auto-generated email. Do not reply to this email.</p>`

    const __dirname = path.resolve()
    const imagePath = path.join(
      __dirname,
      '/frontend/src/assets/images/logo.png'
    )
    const mailOptions = {
      from: '"Cravedu 👻" <sales@cravedu.com>',
      to: `${user && user.email}`,
      subject: `Thank you ${
        user && user.name
      } for purchase course from Cravedu.com !`,
      text: `This is your invoice. ID: ${content && content._id}`,
      html,
      attachments: [
        {
          filename: 'logo.png',
          path: imagePath,
          cid: 'logo@cravedu.com',
        },
      ],
    }

    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
  }
}

export { sendThisMail }
