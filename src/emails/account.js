//import dependencies
const nodemailer = require("nodemailer")

//config nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    // eslint-disable-next-line no-undef
    user: process.env.EMAIL,
    // eslint-disable-next-line no-undef
    pass: process.env.PASSWORD
  },
})

//send welcome email
async function sendWelcomeMail(email, name) {
  try {
    const info = await transporter.sendMail({
      from: "From task-manager-app",
      to: email,
      subject: "Thanks for joining in..",
      text: `Welcome to the task-manager app, ${name}! Let us know how you get along with the app.`,
    })

    console.log("Message Sent: %s", info.messageId)
  } catch (error) {
    console.log(error)
  }
}

//send cancellation email
async function sendCancellationMail(email, name) {
  try {
    const info = await transporter.sendMail({
      from: "From task-manager-app",
      to: email,
      subject: "Account Removal",
      text: `Hey ${name}! Let us know why you deleted your account.`,
    })

    console.log("Message Sent: %s", info.messageId)
  } catch (error) {
    console.log(error)
  }
}

//export email functions
module.exports = {
  sendWelcomeMail,
  sendCancellationMail,
}