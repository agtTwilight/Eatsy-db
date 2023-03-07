const User = require('../models/User');

// TODO add session checkers on applicable routes
// TODO add password encryption & JWT
// TODO add follow & unfollow functions

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // get single user
  getSingleUser(req, res) {
    User.findOne({ username: req.params.username })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that username' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // update user
  updateUser(req, res) {
    User.findOneAndUpdate({ username: req.params.username }, req.body, { new: true })
      .then((user) => res.json(user))
  },

  // delete user
  deleteUser(req, res) {
    User.findOneAndDelete({ username: req.params.username })
      .then((dbUserData) => res.json({ msg: `successfully deleted user ${dbUserData.username}` }))
      .catch((err) => res.status(500).json(err))
  },

  //follow company
  followCompany(req, res) {
    User.findOneAndUpdate(
      { username: req.params.username },
      { $addToSet: { following: req.body.companyId } },
      { runValidators: true, new: true },
    )
      .then((user) => !user ? res.status(404).json({ msg: "No user found with that ID." }) : res.json(user))
      .catch((err) => res.status(500).json(err))
  },

  //unfollow company
  unfollowCompany(req, res) {
    User.findOneAndUpdate(
      { username: req.params.username },
      { $pull: { following: req.body.followingId } },
      { runValidators: true, new: true },
    )
      .then((user) => !user ? res.status(404).json({ msg: "No user found with that ID." }) : res.json(user))
      .catch((err) => res.status(500).json(err))
  },

  // TODO carts will be added and deleted to in the front end. Then, when the cart is finalized, we will push the cart to the backend...this function will probably get changed to be pushing the cart directly to Stripe!
  // create new cart
  createCart(req, res) {
    User.findOneAndUpdate(
      { username: req.params.username },
      { cart: req.body },
      { new: true }
    )
      .then((user) => res.json(user))
  },

  // delete cart
  deleteCart(req, res) {
    User.findOneAndUpdate(
      { username: req.params.username },
      { cart: req.body },
      { new: true }
    )
      .then((user) => res.json(user))
  },
};
