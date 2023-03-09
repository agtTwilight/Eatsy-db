const { Schema, model } = require('mongoose');

const imageSchema = new Schema(
  {
    name: {
      type: String,
      required:true
    },
    image: {
        data:Buffer,
        contentType: String
    },
});

const Image = model("image", imageSchema);

module.exports = Image;