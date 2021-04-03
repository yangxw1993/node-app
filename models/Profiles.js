/*
 * @Author: your name
 * @Date: 2021-04-03 11:02:51
 * @LastEditTime: 2021-04-03 15:18:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node-app/models/Profiles.js
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handel: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    require: true
  },
  skills: {
    type: [String],
  },
  bio:{
    type: String,
  },
  githubusername: {
    type: String,
  },
  experience: [
    {
      current: {
        type: Boolean,
        default: true
      },
      title:{
        type: String,
        require: true
      },
      company: {
        type: String,
        require: true
      },
      location: {
        type: String,
      },
      from: {
        type: String,
        require: true
      },
      to: {
        type: String,
      },
      description: {
        type: String,
      },
    }
  ],
  education: [
    {
      schoole: {
        type: String,
        require: true
      },
      degree: {
        type: String,
        require: true
      },
      fieldofstudy: {
        type: String,
        require: true
      },
      from: {
        type: String,
        require: true
      },
      to: {
        type: String,
      },
      description: {
        type: String,
      },
    }
  ],
  social: {
    wechat: {
      type: String,
      require: true
    },
    QQ: {
      type: String,
      require: true
    }
  },
  date: {
    type: Date,
    require: true
  },
})
module.exports = User = mongoose.model('profiles', ProfileSchema)
