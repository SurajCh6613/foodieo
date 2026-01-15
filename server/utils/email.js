import nodemailer from "nodemailer";
import { convert } from "html-to-text";
import { text } from "express";

class Email {
  constructor(user) {
    this.to = user?.email;
    this.from = `Foodieo ${process.env.EMAIL}`;
    this.firstName = user?.fullName.split(" ")[0] || "User";
  }

  newTransporter() {
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
  }

  async send(subject, message, email = this.to) {
    const mailOptions = {
      from: this.from,
      to: email,
      subject,
      html: message,
      text: convert(message),
    };

    try {
      console.log("Sending Email...");
      await this.newTransporter().sendMail(mailOptions);
      console.log("Email send successfully");
    } catch (error) {
      console.log("Email send failed", error);
      throw new Error("Email sent failed.");
    }
  }

  //   Welcome message
  async sendWelcome() {
    const message = `
      <h1>Welcome to Foodieo</h1>
      <p>Hi ${this.firstName},</p>
      <p>Thank you for joining Foodieo! We're excited to have you.</p>
    `;
    await this.send("Welcome to Foodieo", message);
  }

  async sendOtp(otp) {
    const message = `
      <h2>Your OTP: <strong>${otp}</strong></h2>
      <p>This OTP is valid for 5 minutes.</p>
    `;
    await this.send("Your Foodieo OTP (Valid for 5 Min)", message);
  }
}

export default Email;
