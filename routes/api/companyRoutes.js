const router = require('express').Router();
const {
  getCompanies,
  getSingleCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  sendMessage,
  deleteMessage
} = require('../../controllers/companyController');

// /api/companies
router.route('/').get(getCompanies).post(createCompany);

// /api/companies/:companyId
router.route('/:companyId').get(getSingleCompany).put(updateCompany).delete(deleteCompany);

// /api/companies/:companyId/message
router.route("/:companyId/message".post(sendMessage).delete(deleteMessage))

module.exports = router;