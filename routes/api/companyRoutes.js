const router = require('express').Router();
const {
  getCompanies,
  getSingleCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} = require('../../controllers/companyController');

// /api/companies
router.route('/').get(getCompanies).post(createCompany);

// /api/companies/:companyId
router.route('/:companyId').get(getSingleCompany).put(updateCompany).delete(deleteCompany);

module.exports = router;