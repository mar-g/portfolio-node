const path = require("path");
const sgMail = require("@sendgrid/mail");
const express = require("express");
const app = express();
require("dotenv").config();

const port = 3000;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/", (req, res, next) => {
  sgMail
    .send({
      to: process.env.EMAIL,
      from: process.env.EMAIL,
      subject: req.body.subject,
      text: `Email from: ${req.body.name} (${req.body.email}) Message: ${req.body.message}`,
    })
    .then(() => {
      console.log("Message sent");
    })
    .catch((error) => {
      console.log(error.response.body);
    });

  res.end();
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
