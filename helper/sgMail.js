const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SENDGRID_API_KEY } = process.env
sgMail.setApiKey(SENDGRID_API_KEY)

const sendMail = async (mail) => {
  const msg = { ...mail, from: 'xapoxa14@gmail.com' }
  sgMail.send(msg)
  return true
}

module.exports = sendMail
