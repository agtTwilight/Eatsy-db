const { Schema, model } = require('mongoose');
const Item = require('./Item')
const Status = require('./Status')

// Schema to create company model
const companySchema = new Schema(
  {
    name: {
      type: String,
      required:true,
      maxLength:25
    },
    phoneNumber: {
      type:Number,
      required:true, 
      match: [/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 'Please fill a valid email address']
    },
    email: {
      type:String, 
      required:true, 
      unique:true, 
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
    address: {
      type:String, 
      required:true
    },
    depositMethod: String,
    username: {
      type: String, 
      required:true
    },
    termsOfServiceAgreement: Boolean,
    tags: [String],
    ratings: [Number],
    status: Status,
    menu: [Item],
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
