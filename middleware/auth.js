require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const authHeader = req.headers['x-auth-token'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token)
    return res.status(401).json({ msg: 'No Token, Authorization Denied' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = auth;
