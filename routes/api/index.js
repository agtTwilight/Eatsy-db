const router = require('express').Router();
const companyRoutes = require('./companyRoutes');
const userRoutes = require('./userRoutes');

router.use('/companies', companyRoutes);
router.use('/users', userRoutes);

module.exports = router;
