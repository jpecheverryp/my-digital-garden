require('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const PORT = 5000;

app.use(express.json());

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

app.get('/data', (req, res) => {
  res.json(fakeData);
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  //TODO: AUTHENTICATE USER
  const user = { name: username };
  const accesToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accesToken: accesToken });
});

app.listen(PORT, () => {
  console.log('Server listening in http://localhost:' + PORT);
});
