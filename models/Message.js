const { Schema } = require('mongoose');

const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: 250
    },
    // usernames since they are unique
    from: {
      type: String,
      required: true,
      maxLength: 250
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = messageSchema;
