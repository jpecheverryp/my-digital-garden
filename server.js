require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./config/connection');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const { generateAccessToken } = require('./utils/generateTokens');
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
  });
}

const fakeData = [
  {
    id: 'e2c632a5-2b7c-4d62-a51f-9ce732f28bf7',
    username: 'JuanDev',
    title: 'POST1',
  },
  {
    id: 'e2c632a5-2b7c-4d62-a51f-9ce732f28bf7',

    username: 'Pablo',
    title: 'POST2',
  },
];

// TODO: MOVE TO DATABASE
let refreshTokens = [
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUyYzYzMmE1LTJiN2MtNGQ2Mi1hNTFmLTljZTczMmYyOGJmNyIsInVzZXJuYW1lIjoiSnVhbkRldiIsImlhdCI6MTY0MzQ5NjIxOH0._Q_Zgi8kPLWmStvaN6irEDiQbuN1N0kfeI77MpXfEA0',
];

app.get('/data', auth, (req, res) => {
  res.json(fakeData.filter((thing) => thing.id === req.user.id));
});

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    console.log(user);
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken(user.id, user.username);
    res.json({ accessToken: accessToken, username: user.username });
  });
  return;
});

app.delete('/logout', (req, res) => {
  // TODO: DELETE FROM DB
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log('Server listening in http://localhost:' + PORT)
  );
});
