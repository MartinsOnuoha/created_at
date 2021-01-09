require('dotenv').config()

const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT;

app.set('view engine', 'hbs')

app.get('/get-data', async (req, res) => {
  const url = req.query.url;
  if (url) {
    const result = await axios.get(`${url}`).then(result => result.data);
    console.log(result);
    const { full_name, private, description, html_url, created_at } = result

    return res.json({
      full_name,
      private,
      description,
      html_url,
      created_at,
      avatar: result.owner.avatar_url
    })
  }
  return res.status(400).json({ error: true, msg: 'provide a URL' })
})

app.get('/', (req, res) => {
  return res.render('index')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
