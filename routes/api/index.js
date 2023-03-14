const router = require('express').Router();
const companyRoutes = require('./companyRoutes');
const userRoutes = require('./userRoutes');
const itemRoutes = require("./itemRoutes")

router.use('/companies', companyRoutes);
router.use('/users', userRoutes);
router.use('/items', itemRoutes);

module.exports = router;
