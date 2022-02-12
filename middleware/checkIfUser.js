require('dotenv').config();
const jwt = require('jsonwebtoken');

function checkIfUser(req, res, next) {
  const authHeader = req.headers['x-auth-token'];
  const token = authHeader && authHeader.split(' ')[1];
  req.user = {};
  if (!!token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403);
      req.user = user;
    });
  }
  next();
}

module.exports = checkIfUser;
