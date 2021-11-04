const path = require("path");
const routes = require('./routes');
const express = require("express");
const app = express();
const helmet = require("helmet");

const port = 3000;

app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
