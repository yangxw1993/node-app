/*
 * @Author: your name
 * @Date: 2021-03-01 23:19:15
 * @LastEditTime: 2021-03-27 15:11:54
 * @LastEditors: Please set LastEditors
 * @FilePath: /node-app/routes/api/user.js
 */
const express = require('express');
const gravatar = require('gravatar'); 
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../../models/User');

router.get('/test', (req,res) => {
  res.json({msg: 'login works'})
});
// 注册 
router.post('/register', (req, res) => {
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
    console.log(user);

    // 密码匹配
    const isMatch = bcrypt.compareSync(password, user.password);
    return res.json({ code: isMatch ? 0 : 1, msg: isMatch ? 'ok' : '用户名或密码错误' })
  })
})

 
module.exports = router