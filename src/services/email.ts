import * as nodemailer from "nodemailer";
import { env } from "../env";
export const emailService = {
  async sendEmail(to: string, subject: string, text: string, html: string) {
    const transporter = nodemailer.createTransport({
      host: env.EMAIL_HOST,
      port: env.EMAIL_PORT,
      secure: false,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "teste@teste.com",
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Error sending email");
    }
  },
};
