const router = require('express').Router();
const {
  getCompanies,
  getSingleCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  sendMessage,
  deleteMessage,
  createReview,
  deleteReview
} = require('../../controllers/companyController');

// /api/companies
router.route('/').get(getCompanies).post(createCompany);

// /api/companies/:companyId
router.route('/:companyId').get(getSingleCompany).put(updateCompany).delete(deleteCompany);

// /api/companies/message
router.route("/message").post(sendMessage).delete(deleteMessage)

// /api/companies/review
router.route("/review").post(createReview).delete(deleteReview)

module.exports = router;