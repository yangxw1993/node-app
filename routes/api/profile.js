/*
 * @Author: your name
 * @Date: 2021-04-03 15:19:16
 * @LastEditTime: 2021-04-04 22:58:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node-app/routes/api/profile.js
 */
const express = require('express');
const router = express.Router();
const mongooes = require('mongoose');
const Profile = require('../../models/Profiles');
const User = require('../../models/User');
const {successSend, failSend} = require('../../utils/utils')


/**
 * @description: GET api/profile/test
 * @param {*}
 * @return {*}
 */
router.get('/', (req,res) => {
  Profile.findOne({ user: req.user.id}).populate('user', ['name', 'avatar']).then(profile => {
    if(!profile){
      return res.json(failSend('该用户信息不存在'))
    }
    res.json(successSend('ok', profile))
  }).catch(err => res.json(err))
})
router.post('/', (req, res) => {
  const profileFieds = {
    user : req.user.id
  };
  const { handle = '', 
          company = '', 
          website = '', 
          location = '', 
          status = '', 
          skills = [], 
          bio = '', 
          githubusername = '', 
          experience = [], 
          education = [], social = {}} = req.body
  if (!handle || !status){
    res.json(failSend('参数不完整'))
    return
  }
  Object.assign(profileFieds, { handle, company, website, location, skills, bio, githubusername, experience, education, social});

  Profile.findOne({ user: profileFieds.user}).then(profile => {
    if(profile){
      // 用户信息存在，执行更新方法
      // res.json({ a: '用户信息存在' })
      Profile.findOneAndUpdate({ user: profileFieds.user}, {$set: profileFieds}, {new: true}).then(newUser => {
        res.json(successSend('更新成功', newUser,))
      })
    }else{
      Profile.findOne({handle}).then(user => {
        if(user){
          res.json(failSend('该用户已存在，请勿重返创建'))
        }
      })
      new Profile(profileFieds).save().then(newUser => {
        res.json(successSend( '创建成功', newUser))
      })
      // res.json({ a: '用户信息不存在' })
    }
  })
  
})
/**
 * @description: 通过userid获取个人信息
 * @param {*}
 * @return {*}
 */

router.get('/user/:user_id', (req, res) => {
  const { user_id } = req.params
  Profile.findOne({ user: user_id}).then(profile => {
    if(!profile){
      res.json(failSend('未找到该用户信息'))
    }
    res.json(successSend('ok', profile))
  })
})

// 获取所有列表
router.get('/list', (req, res) => {
  Profile.find().then(profiles => {
    if(!profiles){
      res.json(failSend('没有信息'))
    }
    res.json(successSend('ok', profiles))
  })
})
module.exports = router 
