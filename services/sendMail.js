require('dotenv').config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (userEmail, token) => {
  const verificationUrl = `http://localhost:3000/user/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Email Verification',
    text: ` Thanks for registering.Please verify your email by clicking on the following link: ${verificationUrl}`,
  };
  await transporter.sendMail(mailOptions);
};


module.exports = { sendVerificationEmail };
