/*
 * @Author: your name
 * @Date: 2021-01-27 22:34:35
 * @LastEditTime: 2021-01-27 23:53:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node-app/app.js
 */

const express = require('express');
const exhbs = require('express-handlebars')
const mongoose = require('mongoose');
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.engine('handlebars', exhbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars')

// 链接mongo
mongoose.connect('mongodb://localhost/node-app').then(res => {
  console.log('ok');
}).catch(err => {
  console.log(err); 
})

require("./models/idea");
const Idea = mongoose.model('ideas')
new Idea({
  title: '测试',
  details: '使用mongo'
}).save().then(res => {
  console.log(res);
}).catch(err => {
  console.error(err)
})
 
app.get('/', (req, res) => {
  res.render('index')
})
app.post('/add', (req, res) => {
  console.log(req.body);
  res.send('post')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))