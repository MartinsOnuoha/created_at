require('dotenv').config()

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const mainRoute = require('./routes/index');

app.use(express.static('public'))
app.set('view engine', 'hbs')

app.use('/', mainRoute);

// app.get('/get-data', async (req, res) => {
//   const url = req.query.url;
//   if (url) {
//     const result = await axios.get(`${url}`).then(result => result.data).catch(e => res.status(400).json({ msg: e, error: true }));
//     const { full_name, private, description, html_url, created_at } = result

//     return res.json({
//       full_name,
//       private,
//       description,
//       html_url,
//       created_at: format(new Date(created_at), 'PPPpp'),
//       how_old: new Date().getFullYear() - new Date(created_at).getFullYear(),
//       avatar: result.owner.avatar_url,
//     })
//   }
//   return res.status(400).json({ error: true, msg: 'provide a URL' })
// })

// app.get('/', (req, res) => {
//   return res.render('index')
// })

app.listen(port, () => {
  console.log(`Created at http://localhost:${port}`)
})
