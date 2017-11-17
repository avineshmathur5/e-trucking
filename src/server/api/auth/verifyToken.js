const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');
module.exports = function (token, done) {
  jwt.verify(token, jwtSecret, done);
}