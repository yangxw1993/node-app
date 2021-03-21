/*
 * @Author: your name
 * @Date: 2021-02-19 21:44:33
 * @LastEditTime: 2021-02-20 23:08:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node-app/routes/user.js
 */
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
 

router.get('/login', (req, res) => {
  res.render('users/login')
})
router.get('/register', (req, res) => {
  res.render('users/regiseter')
})

module.exports = router