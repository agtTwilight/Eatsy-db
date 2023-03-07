const { Schema, Types } = require('mongoose');

const messageSchema = new Schema(
  {
    text: {
      type:String,
      required:true,
      maxLength: 250
    },
    from: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = messageSchema;
