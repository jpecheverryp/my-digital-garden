const jwt = require('jsonwebtoken');

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
  return jwt.sign(
    {
      id: id,
      username: username,
    },
    process.env.REFRESH_TOKEN_SECRET
  );
}
module.exports = { generateAccessToken, generateRefreshToken };
