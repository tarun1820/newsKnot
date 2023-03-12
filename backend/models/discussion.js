const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    list_of_message_and_user: [],
  },
  {
    collection: "discussionsInfo",
  }
);

module.exports = mongoose.model("discussionsInfo", discussionSchema);
