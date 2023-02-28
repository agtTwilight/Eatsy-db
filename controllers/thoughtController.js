const Thought = require('../models/Company');
const User = require('../models/User');

module.exports = {
  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

//   update the populate to only be usernames
  // get single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .populate('username')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        console.log(dbThoughtData.username)
                return User.findOneAndUpdate(
                        {username: dbThoughtData.username},
                        {$addToSet: {thoughts: dbThoughtData._id.toString()} },
                        {runValidators:true, new:true}
                );
        })
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
  },

  // update thought
  updateThought(req,res) {
    Thought.findOneAndUpdate({_id: req.params.thoughtId}, req.body, {new:true})
    .then((thought) => res.json(thought))
  },

  // delete thought
  deleteThought(req,res) {
    Thought.findOneAndDelete({_id: req.params.thoughtId}, (err, result) => {
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
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$addToSet: {reactions: req.body} },
      {new:true}
    )
    .then((thought) => res.json(thought))
  },

  // delete friend
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$pull: {reactions: {reactionId: req.body.reactionId} } },
      {new:true}
    )
    .then((thought) => res.json(thought))
  }
};