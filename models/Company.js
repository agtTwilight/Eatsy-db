const { Schema, model } = require('mongoose');
const Message = require('./Message')

// Schema to create company model
const companySchema = new Schema(
  {
    address: {
      type:String, 
      required:true
    },
    lookingForWork: Boolean,
    description: {
      type: String,
      required: true
    },
    tags: [String],
    // TODO refractor `ratings` into a new component called `reviews` ... use `Message` as a reference. Reviews should contain `text` a `rating` (out of 5 stars), and a reference to the userId that is submitting the review.
    ratings: [Number],
    messages: [Message],
    followers: Number,
    menu: [{
      type: Schema.Types.ObjectId,
      ref: "item"
    }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

companySchema
  .virtual('avgRating')
  .get(function () {
    const sum = 0;
    for (i=0;i<this.ratings.length;i++) {
      sum += this.ratings[i];
    }
    return sum/this.ratings.length;
  })
  .set(function (avg) {
    const avgRating = avg;
    this.set({ avgRating});
  });

// Initialize our Thought model
const Company = model('company', companySchema);

module.exports = Company;
