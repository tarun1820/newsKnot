const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    liked_users: [],
  },
  {
    collection: 'reactionInfo',
  }
);

module.exports = mongoose.model('reactionInfo', reactionSchema);
