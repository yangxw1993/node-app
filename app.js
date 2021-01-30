/*
 * @Author: your name
 * @Date: 2021-01-27 22:34:35
 * @LastEditTime: 2021-01-30 21:21:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node-app/app.js
 */

const express = require('express');
const exhbs = require('express-handlebars')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { urlencoded } = require('express');
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(methodOverride('_method'))
app.engine('handlebars', exhbs({
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
}));
app.set('view engine', 'handlebars')

// 链接mongo
mongoose.connect('mongodb://localhost/node-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(res => {
  console.log('ok');
}).catch(err => {
  console.log(err); 
})

require("./models/idea");
const Idea = mongoose.model('ideas');
const idea = new Idea();
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
// 列表
app.get('/book', (req, res) => {
  Idea.find({}).sort({
    date: 'desc'
  }).then(result => {
    res.render('books/list', {document: result})
  })
})
// 添加和编辑
app.get('/add', (req, res) => {
  res.render('books/add')
})
// 获取编辑内容
app.get('/add/:id', (req, res) => {
  console.log(req.params);
  const _id = req.params.id;
  Idea.findOne({ _id }).then(document => {
    res.render('books/add', { document })
  })
})
// 编辑
app.put('/add/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    const {title, details} = req.body;
    idea.title = title;
    idea.details = details;
    
    new Idea(idea).save().then(idea => {
      res.redirect('/book')
    })
  })
})
// 删除
app.delete('/add/:id', (req, res) => {
  Idea.deleteOne({
    _id: req.params.id
  }).then(_=> {
    res.redirect('/book')
  })
})

app.post('/add', (req, res) => {
  console.log(req.body);
  res.send('post')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))