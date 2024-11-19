const express = require('express');
const bodyparser = require('body-parser')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()
const PORT = 3000;

// Middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static("public"))

// Route to handle email sending.
app.post('/send-email', async (req, res) => {
  const { recipient, subject, content } = req.body;

  // create a transporter.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    }
  })

  // Mail options
  const mailOptions = {
    from: process.env.EMAIL,
    to: recipient,
    subject: subject,
    text: content,
  };

  try {
    // send email
    await transporter.sendMail(mailOptions);
    res.send("<script>alert('Email sent successfully!'); window.location.href = '/';</script>")

  } catch (error) {
    console.error("Error sending email:", error);
    res.send("<script>alert('Failed to send email. Please try again.'); window.location.href = '/';</script>");
  }
})

// start the server 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
