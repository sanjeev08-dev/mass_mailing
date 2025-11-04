import nodemailer from 'nodemailer';
import { config } from './config';

export async function sendMail(to: string, subject: string, body: string) {
  const transporter = nodemailer.createTransport({
    host: config.HOST,
    port: config.SMTP_PORT,
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Prof. Sunil Jha - IIT Delhi" <${config.EMAIL_USER}>`,
    to,
    subject,
    html: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
