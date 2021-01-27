
const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/add', (req, res) => {
  console.log(req.body);
  res.send('post')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))