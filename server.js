/*
 * @Author: your name
 * @Date: 2021-03-21 11:51:53
 * @LastEditTime: 2021-03-21 22:52:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node-app/server.js
 */
const express = require('express');
const mongoose = require('mongoose');

const app = express()

// 使用post获取body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

// 链接mongo
mongoose.connect('mongodb://localhost/node-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(res => {
  console.log('mongo is collection success');
}).catch(err => {
  console.log(err);
})

const users = require('./routes/api/user');
app.use('/api/users', users);

const port = 5005
app.listen(port, () => {
  console.log(`server running on port ${port}`);
})
