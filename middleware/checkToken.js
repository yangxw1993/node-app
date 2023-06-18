/*
 * @Author: your name
 * @Date: 2021-04-03 15:47:46
 * @LastEditTime: 2021-04-11 22:07:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node-app/config/checkToken.js
 */
const jwt = require('jsonwebtoken')
const { key } = require('../config/config')
module.exports = ((req,res, next) => {
  // 获取当前请求的URL
  const url = req.originalUrl;
  console.log(url);
  // 不需要验证的URL
  let = urlArr = [
    '/api/users/register', 
    '/api/users/login',
    '/api/profile/list',
    '/api/profile/user/',
    '/api/sendMsg',
  ];
  const isNext = urlArr.find(item => url.includes(item) );
  if(isNext){
    next();
    return false
  }
  // 获取token
  const {token = ''} = req.headers;
  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      return res.status(401).json({ code: 1, msg: '未授权' })
    }
    req.user = decoded
    console.log('合法token');
    next();
    // res.json({ msg: 'success', user: decoded })
  })

})
