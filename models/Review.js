const { Schema } = require("mongoose");

const reviewSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            maxLength: 250,
        },
        rating: {
            type: Number,
            // required: true,
            min: 1,
            max: 5,
        },
        // usernames since they are unique
        from: [String]
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reviewSchema;
