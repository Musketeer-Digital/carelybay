import nodemailer from "nodemailer";

export const mailSender = async (
  email: string,
  title: string,
  body: string,
) => {
  try {
    if (
      !process.env.MAIL_HOST ||
      !process.env.MAIL_PORT ||
      !process.env.MAIL_USER ||
      !process.env.MAIL_PASS ||
      !process.env.MAIL_FROM
    ) {
      throw new Error("Missing mail configuration environment variables");
    }

    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send emails to users
    let info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.FRONTEND_URL}/resetpassword?token=${token}&email=${email}`;
  const emailBody = `
    <h1>Password Reset Request</h1>
    <p>Please click the link below to reset your password:</p>
    <a href="${resetLink}">Reset Password</a>
  `;

  await mailSender(email, "Password Reset Request", emailBody);
};
