const { Schema, Types } = require('mongoose');

const statusSchema = new Schema(
  {
        isOpen: Boolean,
        lastOpen: {
                type: Date,
                default: Date.now,
        },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = statusSchema;
