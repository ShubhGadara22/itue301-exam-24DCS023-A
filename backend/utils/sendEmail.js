const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Check if SMTP configuration exists
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || process.env.EMAIL_USER === "your_email@example.com") {
    console.log(`[Email Service Simulation] Password Reset Email link for ${options.email}: ${options.resetUrl}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_PORT == 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const message = {
    from: `"MedCare Plus Support" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;
