const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    // Create a test account from Ethereal
    const testAccount = await nodemailer.createTestAccount();

    // Create transporter using Ethereal SMTP
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure, // true for 465, false for other ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions = {
      from: `"XExit HR" <${testAccount.user}>`,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info)); // view in browser
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

module.exports = sendEmail;
