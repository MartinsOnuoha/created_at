require('dotenv').config()

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const mainRoute = require('./routes/index');

app.use(express.static('public'))
app.set('view engine', 'hbs')

app.use('/', mainRoute);

app.listen(port, () => {
  console.log(`Created at http://localhost:${port} 🚀`)
})
