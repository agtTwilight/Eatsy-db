const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  logUserIn,
  // logUserOut,
  followCompany,
  unfollowCompany,
  sendMessage,
  deleteMessage,

} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:username
router.route('/:username').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/login/:username
router.route('/login').post(logUserIn)

// /api/users/message
router.route("/message").post(sendMessage).delete(deleteMessage)

// /api/users/:username/following
router.route('/:username/following').post(followCompany).delete(unfollowCompany)

module.exports = router;
