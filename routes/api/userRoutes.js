const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  logUserIn,
  logUserOut,
  followCompany,
  unfollowCompany,
  createPaymentMethod,
  deletePaymentMethod
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/login/:username
router.route('/login/:username').post(logUserIn).delete(logUserOut)

// /api/users/:username/following
router.route('/:username/following').post(followCompany).delete(unfollowCompany)

// /api/users/:userId/friends/:friendId
router.route('/:userId/paymentMethods/:paymentMethodId').post(createPaymentMethod).delete(deletePaymentMethod);

module.exports = router;
