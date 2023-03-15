const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require('cors')
require('dotenv').config();

// TODO this file when we are ready to ship db to heroku
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
