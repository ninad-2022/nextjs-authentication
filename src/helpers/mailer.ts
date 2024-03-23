import nodemailer from "nodemailer";

// TODO: remove any and make interface
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOptions = {
      from: "ninad@yopmail.com",
      to: "ninadbhoir010@gmail.com",
      subject:
        emailType === "VERIFY" ? "Verify Your email" : "Reset your password",
      html: "<b>Hello world!</b>",
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
