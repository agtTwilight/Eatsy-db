const { Schema, Types } = require('mongoose');

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required:true,
      maxLength: 25,
    },
    price: {
      type: Number,
      required:true
    },
    quantity: {
      type: Number,
      default: 0,
    },
    previousQuantity: {
      type: Number
    },
    allergens:[String],
    description: {
      type: String,
      maxLength:250,
    },
    img: {
      type:String
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = itemSchema;
