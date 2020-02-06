const express= require('express');
const router= express.Router();
var nodemailer = require('nodemailer');
const details = require("./cuenta.json");


router.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = "omar";
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
});

let mailOptions = {
    from: 'abc@gmail.com', // sender address
    to: user.email, // list of receivers
    subject: "Wellcome to Fun Of Heuristic 👻", // Subject line
    html: `<h1>Hi OMAR</h1><br>
    <h4>Thanks for joining us</h4>`
};
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
module.exports=router;
/*
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'apidawespol@gmail.com',
    pass: 'omaR2020'
  }
});

var mailOptions = {
  from: 'apidawespol@gmail.com',
  to: 'smartherd@gmail.com, sriyank@smartherd.com',
  subject: 'Sending Email using Node.js',
  text: `Hi Smartherd, thank you for your nice Node.js tutorials.
          I will donate 50$ for this course. Please send me payment options.`
  // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

*/