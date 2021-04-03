/*
 * @Author: your name
 * @Date: 2021-04-03 15:19:16
 * @LastEditTime: 2021-04-03 17:26:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node-app/routes/api/profile.js
 */
const express = require('express');
const router = express.Router();
const mongooes = require('mongoose');
const Profile = require('../../models/Profiles');
const User = require('../../models/User');


/**
 * @description: GET api/profile/test
 * @param {*}
 * @return {*}
 */
router.get('/test', (req,res) => {
  console.log(req.user);
  res.json({msg: 'ok'})
})

router.post('/', (req, res) => {
  const profileFieds = {
    user : req.user.id
  };
  const { handel = '', company = ''} = req.body
  
})
module.exports = router 
