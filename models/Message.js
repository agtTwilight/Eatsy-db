const { Schema, Types } = require('mongoose');

const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: 250
    },
    // usernames since they are unique
    from: [String]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = messageSchema;
