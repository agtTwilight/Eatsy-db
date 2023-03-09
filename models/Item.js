const { Schema, model } = require('mongoose');
// TODO add tags, allergens Change img to a reference to the actual images id
const itemSchema = new Schema(
  {
    name: {
      type: String,
      required:true,
      maxLength: 25,
    },
    description: {
      type: String,
      required: true,
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

const Item = model("item", itemSchema);

module.exports = Item;
