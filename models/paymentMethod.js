const { Schema, Types } = require('mongoose');

// TODO need to add validation to these
const paymentMethodSchema = new Schema(
  {
        cardNumber: Number,
        cardHolderName: String,
        cvc:Number, minLength:3, maxLength:3,
        expiration: Date
  },
  {
    toJSON: {
      getters: true,
      virtuals:true
    },
    id: false,
  }
);

// TODO add a virtual that returns a boolean based on the status of the cards exipiration

module.exports = paymentMethodSchema;
