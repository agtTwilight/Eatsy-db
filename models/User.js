const { Schema, model } = require('mongoose');

// TODO: include `orders` which will be an array of item id's

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: true,
    },
    address: String,
    company:
      {
        type: Schema.Types.ObjectId,
        ref: 'company',
      },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'company',
      },
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
