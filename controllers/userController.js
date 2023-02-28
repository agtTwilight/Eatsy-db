const User = require('../models/User');

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  
  // get single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      // .populate('thoughts')
      // .populate('friends')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    console.log(req.body)
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // update user
  updateUser(req,res) {
    User.findOneAndUpdate({_id: req.params.userId}, req.body, {new:true})
    .then((user) => res.json(user))
  },

  // delete user
  deleteUser(req,res) {
    User.findOneAndDelete({_id: req.params.userId}, (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    })
  },

  // create friend
  createFriend(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$addToSet: {friends:req.params.friendId}},
      {new:true}
    )
    .then((user) => res.json(user))
  },

  // delete friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$pull: {friends:req.params.friendId} },
      {new:true}
    )
    .then((user) => res.json(user))
  }
};
