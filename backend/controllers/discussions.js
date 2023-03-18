const mongoose = require('mongoose');
const discussionsInfo = require('../models/discussion');
exports.getDiscussions = (req, res, next) => {
  const title = req.params.title;

  const discussions_get = discussionsInfo.findOne(
    { title },
    (err, foundArticle) => {
      if (err) {
        console.log(err.message);
      } else {
        return res.send({ discussions: foundArticle.list_of_message_and_user });
      }
    }
  );
};
