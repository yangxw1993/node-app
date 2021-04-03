/*
 * @Author: your name
 * @Date: 2021-04-03 15:47:46
 * @LastEditTime: 2021-04-03 17:12:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node-app/config/checkToken.js
 */
const jwt = require('jsonwebtoken')
const { key } = require('../config/config')
module.exports = ((req,res, next) => {
  // 获取当前请求的URL
  const url = req.originalUrl;
  // 不需要验证的URL
  let = urlArr = ['/apli/users/register', '/api/users/login'];
  const isNext = urlArr.find(item => item === url);
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
