// @ts-ignore

import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "megamess.help@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});