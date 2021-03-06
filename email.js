const sgMail = require("@sendgrid/mail");
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (req, res) => {
    sgMail
    .send({
      to: process.env.EMAIL,
      from: process.env.EMAIL,
      subject: req.body.subject,
      text: `Email from: ${req.body.name} (${req.body.email}) Message: ${req.body.message}`,
    })
    .then(() => {
      console.log("Wyslano");
    })
    .catch((error) => {
      console.log(error.response.body);
    });

  res.end();
}

module.exports = sendEmail;