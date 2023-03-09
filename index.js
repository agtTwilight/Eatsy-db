const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require('cors')

// TODO this file when we are ready to ship db to heroku
const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(routes);

app.get('/api/image', async (req,res) => {
  const allData = await Image.find()
  res.json(allData)
})

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
