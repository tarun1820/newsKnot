const reactionInfo = require('../models/reactions');

exports.getReactions = async (req, res, next) => {
  try {
    const item = await reactionInfo.find({ title: req.params.title });
    if (item.length === 0) {
      return res.status(400).json({
        success: false,
        error_id: 0,
        message: 'The article with title not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'successFull get Request',
      likes: item[0].likes,
    });
  } catch (err) {
    res.status(408).json({
      success: false,
      error_id: 1,
      message: err.message,
    });
  }
};

exports.putReactions = async (req, res, next) => {
  try {
    const articleReactions = await reactionInfo.find({
      title: req.params.title,
    });
    if (articleReactions.length !== 0) {
      let liked_users_data = articleReactions[0].liked_users;
      let presentFlag = 0;
      for (let iter = 0; iter < liked_users_data.length; iter++) {
        if (liked_users_data[iter] === req.user.username) {
          /// this user has already liked , clicking again leads in removing the like
          presentFlag = 1;
        }
      }

      if (presentFlag === 0) {
        // This user is not present in liked users list , onclicking should append to liked users list
        liked_users_data.push(req.user.username); // increases the number of likes
      } else {
        // This user has already liked the article on clicking again , should remove from liked users list
        liked_users_data.splice(liked_users_data.indexOf(req.user.username), 1);
      }
      try {
        const item = await reactionInfo.findOneAndReplace(
          { title: req.params.title },
          {
            title: req.params.title,
            likes: liked_users_data.length,
            liked_users: liked_users_data,
          }
        );
        const update_item = await reactionInfo.find({
          title: req.params.title,
        });

        res.status(200).json({
          success: true,
          likes: update_item[0].likes,
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          message: 'replace Failed',
        });
      }
    } else {
      let obj = {
        title: req.body.title,
        likes: 1,
        liked_users: [req.user.username],
      };

      try {
        const item = await reactionInfo.create(obj);
        res.status(200).json({
          success: true,
          likes: item.likes,
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          message: 'creating an entry in database failed',
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
