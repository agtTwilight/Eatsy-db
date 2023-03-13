const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  logUserIn,
  isValidToken,
  // logUserOut,
  followCompany,
  unfollowCompany,
  sendMessage,
  deleteMessage,

} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/login/:username
router.route('/login').get(isValidToken).post(logUserIn)

// /api/users/message
router.route("/message").post(sendMessage).delete(deleteMessage)

// /api/users/:username
router.route('/:username').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:username/following
router.route('/:username/following').post(followCompany).delete(unfollowCompany)

module.exports = router;
