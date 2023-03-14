const { Schema, model, Types } = require('mongoose');
const Message = require("./Message");
const bcrypt = require('bcrypt');

// TODO: add `hero` and `profile` img fields

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
    ],
    messages: [Message],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
