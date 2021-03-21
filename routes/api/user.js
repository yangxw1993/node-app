/*
 * @Author: your name
 * @Date: 2021-03-01 23:19:15
 * @LastEditTime: 2021-03-21 22:59:32
 * @LastEditors: Please set LastEditors
 * @FilePath: /node-app/routes/api/user.js
 */
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../../models/User');

router.get('/test', (req,res) => {
  res.json({msg: 'login works'})
});

router.post('/register', (req, res) => {
  console.log(req.body  );
  const {email, name, password} = req.body;
  User.findOne({
    email
  }).then(user => {
    if(user){
      return res.status(400).json({
        code: 1,
        msg: '邮箱已注册'
      })
    }else{
      const newUser = new User({
        name, email, password, avatar: ''
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
                  .then(user => res.json(user))
                  .catch(err => console.error(err));
        })
      })
    }
  })
  // res.send(newUser)
})

 
module.exports = router