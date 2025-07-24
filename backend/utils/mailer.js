const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use another SMTP service
      auth: {
        user: process.env.EMAIL_USER,      // your email
        pass: process.env.EMAIL_PASSWORD,  // app-specific password or real password
      },
    });

    const mailOptions = {
      from: `"XExit HR" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

module.exports = sendEmail;
