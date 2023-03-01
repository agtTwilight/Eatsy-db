const { Schema, model } = require('mongoose');
const paymentMethod = require('./paymentMethod')

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type:String, 
      required:true, 
      unique:true, 
      trim:true
    },
    email: {
      type:String, 
      required:true, 
      unique:true, 
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
    address: [String],
    paymentMethods: [paymentMethod],
    company: [
      {
        type: Schema.Types.ObjectId,
        ref: 'company',
      },
    ],
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

userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  })
  .set(function (v) {
    const friendCount = v;
    this.set({ friendCount});
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
