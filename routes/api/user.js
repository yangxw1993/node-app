/*
 * @Author: your name
 * @Date: 2021-03-01 23:19:15
 * @LastEditTime: 2021-03-28 11:51:49
 * @LastEditors: Please set LastEditors
 * @FilePath: /node-app/routes/api/user.js
 */
const express = require('express');
const gravatar = require('gravatar'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { key } = require('../../config/config')
const router = express.Router();
const User = require('../../models/User');
const passport = require('passport')

router.get('/test', (req,res) => {
  res.json({msg: 'login works'})
});
// 注册 
router.post('/register', (req, res) => {
  const {email, name, password} = req.body;
  if(!email || !name || !password){
    res.json({
      code: 1, 
      msg: '参数不完整'
    })
    return
  }
  User.findOne({
    email
  }).then(user => {
    if(user){
      return res.status(400).json({
        code: 1,
        msg: '邮箱已注册'
      })
    }else{
      const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'})
      const newUser = new User({
        name, email, password, avatar
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

// 登录

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // 查询
  User.findOne({email}).then(user => {
    if(!user){
      return res.json({code: 1, msg: '用户不存在!'})
    }

    // 密码匹配
    const isMatch = bcrypt.compareSync(password, user.password);
    if(isMatch){
      // 设置token
      const rule = { id: user.id, name: user.name };
      jwt.sign(rule, key, { expiresIn: 60 * 60 }, (err, token) => {
        if (err) throw err;
        res.json({
          code: 0,
          data: 'Bearer ' + token
        })
      })
    }else{
      res.json({ code: 1, msg: '用户名或密码错误' })
    }
    
  })
})
/**
 * $router GET api.user/checkLogin
 */
router.get('/checkToken', 
          passport.authenticate('jwt', {session: false}), 
          (req,res) => {
  res.json({msg: 'success'})
})
 
module.exports = router