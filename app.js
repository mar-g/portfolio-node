const path = require('path');
const express = require("express");
const app = express();

const port = 3000

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
})


app.post('/', (req, res, next) => {
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.subject);
  console.log(req.body.message);
  res.end();
})

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})