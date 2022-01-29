const jwt = require('jsonwebtoken');
const { Token } = require('../models');
function generateAccessToken(id, username) {
  return jwt.sign(
    {
      id: id,
      username: username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1h',
    }
  );
}
function generateRefreshToken(id, username) {
  const refreshToken = jwt.sign(
    {
      id: id,
      username: username,
    },
    process.env.REFRESH_TOKEN_SECRET
  );
  Token.create({
    token: refreshToken,
  });
  return refreshToken;
}
module.exports = { generateAccessToken, generateRefreshToken };
