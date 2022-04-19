const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const logger = require("./logger");
dotenv.config();


async function sendMail(to, subject, text, html) {

  console.log("inside the sendmail")
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: "smtp-relay.sendinblue.com",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: "jaykhairnar99@gmail.com", // generated ethereal user
      pass: "Jk@12345", // generated ethereal password
    },
  });
  transporter.verify().then(console.log).catch((error)=>{console.log(error)});
  console.log("before sending mail")
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.MAIL_USER, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  });
  
  return info;

}

module.exports= sendMail;



