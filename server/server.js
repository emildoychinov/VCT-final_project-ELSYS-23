const express = require('express')
const app = express()
const port = 80
const database = require('./database.js')

app.get('/', (req, res) => {
  res.sendFile('client/html/index.html', { root: '../' });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
