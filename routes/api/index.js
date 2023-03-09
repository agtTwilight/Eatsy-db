const router = require('express').Router();
const companyRoutes = require('./companyRoutes');
const userRoutes = require('./userRoutes');
const itemRoutes = require("./itemRoutes")
const imageRoutes = require("./imageRoutes")

router.use('/companies', companyRoutes);
router.use('/users', userRoutes);
router.use('/items', itemRoutes);
router.use('/image', imageRoutes);

module.exports = router;
