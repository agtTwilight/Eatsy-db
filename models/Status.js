const { Schema, Types } = require('mongoose');

const itemSchema = new Schema(
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

module.exports = itemSchema;
