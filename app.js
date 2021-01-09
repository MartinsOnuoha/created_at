require('dotenv').config()

const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT;

app.set('view engine', 'hbs')

app.get('/get-data', async (req, res) => {
  const result = await axios.get('https://api.github.com/repos/defunkt/fixture_scenarios_builder').then(result => result.data);
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
})

app.get('/', (req, res) => {
  return res.render('index')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
