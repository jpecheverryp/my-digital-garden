const express = require('express');
const path = require('path');
const sequelize = require('./config/connection');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(require('./routes'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log('Server listening in http://localhost:' + PORT)
  );
});
