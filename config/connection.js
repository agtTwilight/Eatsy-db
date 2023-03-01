const { connect, connection } = require('mongoose');

connect('mongodb://localhost/eatsy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
