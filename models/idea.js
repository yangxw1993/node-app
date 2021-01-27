/*
 * @Author: your name
 * @Date: 2021-01-27 23:12:12
 * @LastEditTime: 2021-01-27 23:16:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node-app/models/idea.js
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IdeaSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})
mongoose.model('ideas', IdeaSchema)