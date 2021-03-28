/*
 * @Author: your name
 * @Date: 2021-03-27 22:47:57
 * @LastEditTime: 2021-03-28 11:45:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node-app/config/passport.js
 */
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const mongooes = require('mongoose');
// const User = mongooes.model('users');
const {key} = require('./config')

const  opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt'),
  secretOrKey: key
}

module.exports = passport => {
  console.log(opts,'options');
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
    // User.findOne({ id: jwt_payload.sub }, (err, user) =>  {
    //   if (err) {
    //     return done(err, false);
    //   }
    //   if (user) {
    //     return done(null, user);
    //   } else {
    //     return done(null, false);
    //     // or you could create a new account
    //   }
    // });
  }));
}
