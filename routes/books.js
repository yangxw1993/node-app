/*
 * @Author: your name
 * @Date: 2021-02-19 21:44:23
 * @LastEditTime: 2021-02-19 22:16:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node-app/routes/books.js
 */

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


require("../models/idea");
const Idea = mongoose.model('ideas');
const idea = new Idea();

// 列表
router.get('/book', (req, res) => {
  Idea.find({}).sort({
    date: 'desc'
  }).then(result => {
    res.render('books/list', { document: result })
  })
})
// 添加和编辑
router.get('/add', (req, res) => {
  res.render('books/add')
})
// 获取编辑内容
router.get('/add/:id', (req, res) => {
  console.log(req.params);
  const _id = req.params.id;
  Idea.findOne({ _id }).then(document => {
    res.render('books/add', { document })
  })
})
// 编辑
router.put('/add/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    const { title, details } = req.body;
    idea.title = title;
    idea.details = details;

    new Idea(idea).save().then(idea => {
      req.flash('success_msg', '数据更新成功')
      res.redirect('/book')
    })
  })
})
// 删除
router.delete('/add/:id', (req, res) => {
  Idea.deleteOne({
    _id: req.params.id
  }).then(_ => {
    req.flash('success_msg', '数据删除成功')
    res.redirect('/book')
  })
})
module.exports = router