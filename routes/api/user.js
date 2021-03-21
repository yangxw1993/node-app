/*
 * @Author: your name
 * @Date: 2021-03-01 23:19:15
 * @LastEditTime: 2021-03-21 22:04:22
 * @LastEditors: Please set LastEditors
 * @FilePath: /node-app/routes/api/user.js
 */
const express = require('express');
const router = express.Router();

router.get('/test', (req,res) => {
  res.json({msg: 'login works'})
});

router.post('/register', (req, res) => {
  console.log(req.body  );
  res.send(req.body)
})

 
module.exports = router