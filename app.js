/*
 * @Author: your name
 * @Date: 2021-01-27 22:34:35
 * @LastEditTime: 2021-02-20 23:22:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node-app/app.js
 */

const express = require('express');
const path = require('path');
const exhbs = require('express-handlebars')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { urlencoded } = require('express');
const flash = require('connect-flash');
const session = require('express-session')
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(methodOverride('_method'))

// 使用静态文件
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))

app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next()
})

app.engine('handlebars', exhbs({
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
}));
app.set('view engine', 'handlebars')

// load router
const ideas = require('./routes/books.js');
const users = require('./routes/user.js');


// 链接mongo
mongoose.connect('mongodb://localhost/node-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(res => {
  console.log('ok');
}).catch(err => {
  console.log(err); 
})

// new Idea({
//   title: '测试',
//   details: '使用mongo'
// }).save().then(res => {
//   console.log(res);
// }).catch(err => {
//   console.error(err)
// })
//  首页
app.get('/', (req, res) => {
  const title = '大家好，我们首页。'
  res.render('index', {
    title,
  })
})
// 关于我们
app.get('/about', (req, res) => {
  res.render('about')
})

// use router
app.use('/', ideas)
app.use('/users', users);


app.post('/add', (req, res) => {
  console.log(req.body);
  res.send('post')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))