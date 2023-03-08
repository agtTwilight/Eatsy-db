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
  createCart,
  deleteCart
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:username
router.route('/:username').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/login/:username
// router.route('/login/:username').post(logUserIn).delete(logUserOut)

// /api/users/:username/following
router.route('/:username/following').post(followCompany).delete(unfollowCompany)

module.exports = router;
