const Company = require('../models/Company');
const User = require('../models/User');

module.exports = {
  // get all comapnies ... used on homepage to display all companies
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

  // send message to a company
  sendMessage(req, res) {
    Company.findOneAndUpdate(
      { _id: req.params.companyId },
      { $addToSet: { messages: req.body } },
      { new: true }
    )
      .then((company) => res.json({ msg: `Your message has been successfully sent to ${company.name}.` }))
      .catch((err) => res.status(500).json(err));
  },

  // delete message
  deleteMessage(req, res) {
    Company.findOneAndUpdate(
      { _id: req.params.companyId },
      { $pull: { messages: { from: req.body.userId } } }
    ).then((company) => res.json({ msg: `Your message to ${company.name} has been deleted.` }))
      .catch((err) => res.status(500).json(err))
  },


  //create review
  createReview(req, res) {
    Company.findOneAndUpdate(
      { _id: req.params.companyId },
      { $addToSet: { reviews: req.body } },
      { new: true }
    ).then((company) => res.json({ msg: `Your review to ${company.name} has been created.` }))
      .catch((err) => res.status(500).json(err))
  },

  //delete review
  deleteReview(req, res) {
    Company.findOneAndDelete(
      { _id: req.params.companyId },
      { $pull: { reviews: { from: req.body.userId } } }
    ).then((company) => res.json({ msg: `Your review has been deleted for ${company.name}` }))
      .catch((err) => res.status(500).json(err))
  },

};