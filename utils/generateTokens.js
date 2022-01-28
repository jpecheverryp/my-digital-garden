const jwt = require('jsonwebtoken');

function generateAccessToken(id) {
  return jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '45m',
  });
}
function generateRefreshToken(id) {
  return jwt.sign({ id: id }, process.env.REFRESH_TOKEN_SECRET);
}
module.exports = { generateAccessToken, generateRefreshToken };
