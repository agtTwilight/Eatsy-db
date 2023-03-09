const { Schema, model } = require("mongoose");
const Review = require("./Review");

// Schema to create company model
const companySchema = new Schema(
  {
    lookingForWork: Boolean,
    description: {
      type: String,
      required: true,
    },
    tags: [String],
    reviews: [Review],
    followers: Number,
    menu: [
      {
        type: Schema.Types.ObjectId,
        ref: "item",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

companySchema
  .virtual("avgRating")
  .get(function () {
    const sum = 0;
    for (i = 0; i < this.reviews.length; i++) {
      sum += this.reviews.rating[i];
    }
    return sum / this.reviews.length;
  })
  .set(function (avg) {
    const avgRating = avg;
    this.set({ avgRating });
  });

// Initialize our Company model
const Company = model("company", companySchema);

module.exports = Company;
