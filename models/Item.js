const { Schema, model, Types } = require('mongoose');

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 25,
    },
    description: {
      type: String,
      required: true,
      maxLength: 250,
    },
    img: {
      type: Schema.Types.ObjectId,
      ref: 'image'
    },
    tags: [{
      type: String,
      required: true,
      maxLength: 25,
    }],
    allergens: [{
      type: String,
      required: true,
      maxLength: 25,
    }]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Item = model("item", itemSchema);

module.exports = Item;
