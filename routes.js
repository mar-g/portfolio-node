const express = require("express");
const router = express.Router();
const sendEmail = require('./email');
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

router.post("/", (req, res) => {
 sendEmail(req, res);
});

module.exports = router;
