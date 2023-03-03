const Company = require('../models/Company');
const User = require('../models/User');

module.exports = {
  // get all comapnies
  getCompanies(req, res) {
    Company.find()
      .select('-__v')
      .populate('menu')
      .then((companies) => res.json(companies))
      .catch((err) => res.status(500).json(err));
  },

  // get single company
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
      .then((company) => res.json(company))
  },

  // delete company
  deleteCompany(req, res) {
    Company.findOneAndDelete({ _id: req.params.companyId })
    .then((company) => res.json({msg: `successfully deleted company: ${company.name}`}))
    .catch((err) => res.status(500).json(err));
  },
};