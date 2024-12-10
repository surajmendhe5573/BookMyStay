const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email provider
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

exports.sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully.');
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};
