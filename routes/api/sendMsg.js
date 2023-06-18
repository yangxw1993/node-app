/*
 * @Author: your name
 * @Date: 2021-04-03 15:19:16
 * @LastEditTime: 2021-04-11 23:03:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node-app/routes/api/profile.js
 */
const https = require('https');
// const request = require('request')
const express = require('express');
const router = express.Router();
const { successSend, failSend } = require('../../utils/utils')
const tencentcloud = require("tencentcloud-sdk-nodejs")

// 导入对应产品模块的client models。
// const CvmClient = tencentcloud.cvm.v20170312.Client;
// const clientConfig = {
//   // 腾讯云认证信息 key IURGn49yK6rLYVXIci6D5vwmLegWN0Qc
//   credential: {
//     secretId: "AKIDcgXKwOPjZAakjyozA7tYE1gBUQFp8VZU",
//     secretKey: "IURGn49yK6rLYVXIci6D5vwmLegWN0Qc",
//   },
//   // 产品地域
//   region: "ap-shanghai",
//   // 可选配置实例
//   profile: {
//     signMethod: "HmacSHA256", // 签名方法
//     httpProfile: {
//       endpoint: "sms.tencentcloudapi.com",
//       reqMethod: "POST", // 请求方法
//       reqTimeout: 30, // 请求超时时间，默认60s
//     },
//   },
// }
// // 实例化要请求产品(以cvm为例)的client对象
// const client = new CvmClient(clientConfig)
// // 通过client对象调用想要访问的接口，需要传入请求对象以及响应回调函数
// client.DescribeZones().then(
//   (data) => {
//     // console.log(data)
//   },
//   (err) => {
//     console.error("error", err)
//   }
// )


/**
 * @description: GET api/sendMsg
 * @param {*}
 * @return {*}
 */
router.post('/', (req, res) => {
  const {phone} = req.body;
  const tempID = 361337;
  const SDKAppID = 1400507655;
  const sign = '杨小伟学习记录';
  const url = `https://sms.tencentcloudapi.com/?Action=SendSms&PhoneNumberSet.N=+86${phone}&TemplateID=${tempID}&Sign=${sign}&SmsSdkAppid=${SDKAppID}`;
  https.get(url, (result) => {
    result.on('data', (data) => {
      res.send(data);
    });
    result.on('end', () => {

    })
  })
  
})

module.exports = router
