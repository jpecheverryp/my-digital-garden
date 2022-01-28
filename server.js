require('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const path = require('path');

const PORT = 5000;

app.use(express.json());

app.use(require('./routes'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
  });
}

const fakeData = [
  {
    username: 'Juan',
    title: 'POST1',
  },
  {
    username: 'Pablo',
    title: 'POST2',
  },
];

// TODO: MOVE TO DATABASE
let refreshTokens = [];

app.get('/data', authenticateToken, (req, res) => {
  res.json(fakeData.filter((thing) => thing.username === req.user.name));
});

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
  return;
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  //TODO: AUTHENTICATE USER
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  refreshTokens.push(refreshToken); //TODO: insert this token in database
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

app.delete('/logout', (req, res) => {
  // TODO: DELETE FROM DB
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '45m',
  });
}
function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(PORT, () => {
  console.log('Server listening in http://localhost:' + PORT);
});
