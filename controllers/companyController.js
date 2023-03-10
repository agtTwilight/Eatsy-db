const Company = require('../models/Company');
const User = require('../models/User');

module.exports = {
  // get all comapnies ... used on homepage to display all companies
  // TODO there is a bug where adding reviews breaks the fetch requests. Fix that.
  getCompanies(req, res) {
    Company.find()
      .select('-__v')
      // companies have a reference ID to `item models` ... populate displays all items the company has an id for
      .populate('menu')
      .then((companies) => res.json(companies))
      .catch((err) => res.status(500).json(err));
  },

  // get single company ... used to only display one company
  // TODO might not be necessary since we aren't keeping track of stock anymore.
  getSingleCompany(req, res) {
    Company.findOne({ _id: req.params.companyId })
      .then((company) =>
        !company
          ? res.status(404).json({ message: 'No company with that ID' })
          : res.json(company)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new company
  createCompany(req, res) {
    Company.create(req.body)
      .then((dbCompanyData) => {
        return User.findOneAndUpdate(
          // TODO make username = req.session.username, but with tokens once you implement that feature
          { username: req.body.username },
          { $addToSet: { company: dbCompanyData._id.toString() } },
          { runValidators: true, new: true }
        );
      })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // update company
  updateCompany(req, res) {
    Company.findOneAndUpdate({ _id: req.params.companyId }, req.body, { new: true })
      .then((company) => res.json({ msg: `Your updates to ${company.name} have been applied.` }))
  },

  // delete company
  // TODO does this delete the company id from user company array?
  deleteCompany(req, res) {
    Company.findOneAndDelete({ _id: req.params.companyId })
      .then((company) => res.json({ msg: `Successfully deleted company: ${company.name}.` }))
      .catch((err) => res.status(500).json(err));
  },


  //create review
  createReview(req, res) {
    Company.findOneAndUpdate(
      { _id: req.body.companyId },
      { $addToSet: { reviews: req.body } },
      { new: true }
    ).then((company) => res.json({ msg: `Your review to ${company.name} has been created.` }))
      .catch((err) => res.status(500).json(err))
  },

  // TODO delete reviews by review id?
  //delete review
  deleteReview(req, res) {
    Company.findOneAndDelete(
      { _id: req.body.companyId },
      { $pull: { reviews: { from: req.body.reviewId } } }
    ).then((company) => res.json({ msg: `Your review has been deleted for ${company.name}` }))
      .catch((err) => res.status(500).json(err))
  },

};