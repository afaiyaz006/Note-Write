import nodemailer from "nodemailer";
interface EmailContent {
  to: string;
  subject: string;
  text: string;
}
const transporter = nodemailer.createTransport({
  port: Number(process.env.EMAIL_PORT),
  host: process.env.EMAIL_HOST as string,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendVerificationEmail(emailContent: EmailContent) {
  console.log(`Email sent...`);
  console.log(emailContent);
  try {
    transporter.sendMail({
      from: `Faiyaz <${process.env.EMAIL_USER}>`,
      to: emailContent.to,
      subject: emailContent.subject,
      text: emailContent.text,
    });
  } catch (error) {
    console.log(error);
  }
}
export async function sendPasswordResetEmail(emailContent: EmailContent) {
  console.log(`Email sent...`);
  console.log(emailContent);
  try {
    transporter.sendMail({
      from: `Faiyaz <${process.env.EMAIL_USER}>`,
      to: emailContent.to,
      subject: emailContent.subject,
      text: emailContent.text,
    });
  } catch (error) {
    console.log(error);
  }
}
