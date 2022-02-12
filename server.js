require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./config/connection');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
  });
}

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log('Server listening in http://localhost:' + PORT)
  );
});
