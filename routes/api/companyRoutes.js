const router = require('express').Router();
const {
  getCompanies,
  getSingleCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  createItem,
  deleteItem,
  updateItem
} = require('../../controllers/thoughtController');

// /api/companies
router.route('/').get(getCompanies).post(createCompany);

// /api/companies/:companyId
router.route('/:companyId').get(getSingleCompany).put(updateCompany).delete(deleteCompany);

// /api/companies/:companyId/items
router.route('/:companyId/items').post(createItem).delete(deleteItem)

// /api/companies/:companyId/items/:itemId
router.route('/:companyId/items/:itemId').put(updateItem)

module.exports = router;