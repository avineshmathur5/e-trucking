const config = require('../../config'),
  jwtExp = typeof config.jwtTokenExpires != 'undefined' ? config.jwtTokenExpires : 2,
  jwt = require('jsonwebtoken'),
  jwtSecret = config.jwtSecret;

function generateToken(tokenData, done) {
  jwt.sign({
    auth: 'magic',
    data: tokenData,
    exp: Math.floor(new Date().getTime() / 1000) + jwtExp * 24 * 60 * 60 //expires in days
  }, jwtSecret, done);
}
module.exports = generateToken;