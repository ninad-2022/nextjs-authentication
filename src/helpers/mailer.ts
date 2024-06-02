import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import nodemailer from "nodemailer";
import { Const } from "@/constant";

// TODO: remove any and make interface
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === Const.VERIFY) {
      await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 });
    } else if (emailType === Const.RESET) {
      await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 });
    };

    const { NODE_MAILER_USER, NODE_MAILER_PASSWORD } = process.env;
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: { user: NODE_MAILER_USER, pass: NODE_MAILER_PASSWORD },
    });
    
    const mailOptions = {
      from: "ninad@yopmail.com",
      to: email,
      subject:
        emailType === Const.VERIFY ? "Verify Your email" : "Reset your password",
      html: `<p>click <a href="${process.env.DOMAIN
        }/verifyemail?token=${hashedToken}">here</a> to ${emailType === Const.VERIFY ? "Verify your email" : "rest your password"
        } or copy paste the link below in your browser.
      <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
