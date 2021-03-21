/*
 * @Author: your name
 * @Date: 2021-03-21 14:32:28
 * @LastEditTime: 2021-03-21 14:50:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node-app/models/User.js
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
})
module.exports = User = mongoose.model('users', UserSchema)
