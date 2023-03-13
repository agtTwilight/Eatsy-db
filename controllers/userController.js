const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// TODO add session checkers on applicable routes
// TODO add password encryption & JWT
// TODO add follow & unfollow functions

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      .populate({
        path: "company",
        populate: {
          path: "menu"
        }
      })
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  //login user
  logUserIn(req, res) {
    User.findOne({username: req.body.username}).then(foundUser => {
      if (!foundUser) {
        return res.status(401).json({ msg: "Invalid credentials were input." })
      } 
      
      if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
        return res.status(401).json({ msg: "Invalid credentials were input." })
      }
      
      const token = jwt.sign({
        id: foundUser._id,
        username: foundUser.username
      }, "eatsyeatsy", {
        expiresIn: "6h"
      })
      console.log(token)
      return res.json({
        msg: "successfully logged in",
        token: token,
        user: foundUser
      })
    })
    .catch((err) => {
      console.log(err)
      res.json({msg: "an error has occured"})
    })
  },

  // get user by token
  isValidToken (req, res) {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(403)
        .json({ isValid: false, msg: "ERR, you must be logged to perform this action." });
    }
    try {
      const tokenData = jwt.verify(token,"eatsyeatsy");
      res.json({
        msg:"success",
        isValid: true,
        user: tokenData,
      });
    } catch (err) {
      res.status(403).json({
        isValid: false,
        msg: "invalid token",
      });
    }
  },

  // get single user
  getSingleUser(req, res) {
    User.findOne({ username: req.params.username })
      .populate({
        path: "company",
        populate: {
          path: "menu"
        }
      })
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
      .then((dbUserData) => {
        const token = jwt.sign({
          id: foundUser._id,
          username: foundUser.username
        }, "eatsyeatsy", {
          expiresIn: "6h"
        })
        console.log(token)
        return res.json({
          msg: "successfully created",
          token: token,
          user: dbUserData
        })
      })
      .catch((err) => {
        console.log(err)
        res.json({msg: "an error has occured"})
      })
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

  // TODO make the following functions send with JWT active username
  // send message to a user
  sendMessage(req, res) {
    User.findOneAndUpdate(
      { username: req.body.username },
      { $addToSet: { messages: req.body } },
      { new: true }
    )
      .then((user) => res.json({ msg: `Your message has been successfully sent to ${user.username}.` }))
      .catch((err) => res.status(500).json(err));
  },

  // delete message
  deleteMessage(req, res) {
    User.findOneAndUpdate(
      { username: req.body.username },
      { $pull: { messages: { from: req.body.username } } }
    ).then((user) => res.json({ msg: `Your message to ${user.username} has been deleted.` }))
      .catch((err) => res.status(500).json(err))
  },
};
