// @ts-ignore

import nodemailer from "nodemailer";
import hbs from 'nodemailer-express-handlebars'
import path from 'path'
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "megamess.help@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});


const handlebarOptions = {
  viewEngine: {
      partialsDir: path.resolve('./views/'),
      defaultLayout: false,
  },
  viewPath: path.resolve('./views/'),
};

transporter.use('compile', hbs(handlebarOptions))
