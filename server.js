/*
 * @Author: your name
 * @Date: 2021-03-21 11:51:53
 * @LastEditTime: 2021-04-11 22:04:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node-app/server.js
 */
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const checkToken = require('./middleware/checkToken')


const app = express()


// 使用post获取body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

// possport初始化
app.use(passport.initialize())
require('./config/passport')(passport)

// 链接mongo
mongoose.connect('mongodb://localhost/node-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(res => {
  console.log('mongo is collection success ************');
}).catch(err => {
  console.log(err);
})
app.get('/', (req, res) => {
  res.json({ msg: 'Hello Nodejs' })
})
// 全局验证token
app.use(checkToken);
const users = require('./routes/api/user');
app.use('/api/users', users);
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/sendMsg', require('./routes/api/sendMsg'));

const port = 5005
app.listen(port, () => {
  console.log(`server running on port ${port}`);
})
