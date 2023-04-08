const reactionInfo = require("../models/reactions");
const userinfo = require("../models/user");

exports.getReactions = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const item = await reactionInfo.find({ title: req.params.title });

      if (item.length === 0) {
        return res.status(400).json({
          success: false,
          error_id: 0,
          message: "The article with title not found",
        });
      }
      item_liked_users = item[0].liked_users;
      let isLiked = false;
      if (item_liked_users.indexOf(req.user.username) !== -1) {
        isLiked = true;
      } else {
        isLiked = false;
      }
      res.status(200).json({
        success: true,
        message: "successFull get Request",
        likes: item[0].likes,
        liked: isLiked,
      });
    } catch (err) {
      res.status(408).json({
        success: false,
        error_id: 1,
        message: err.message,
      });
    }
  } else {
    console.log("log out");
    res.send({ status: "not login" });
  }
};

exports.putReactions = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const userid = req.user.id; // User id to access into database
    let isLiked = true;
    console.log("hello");
    try {
      console.log("hello Inside Try");
      const articleReactions = await reactionInfo.find({
        title: req.params.title,
      });
      console.log("hello After database Query");
      if (articleReactions.length !== 0) {
        let liked_users_data = articleReactions[0].liked_users;
        let presentFlag = 0;
        for (let iter = 0; iter < liked_users_data.length; iter++) {
          if (liked_users_data[iter] === req.user.username) {
            /// this user has already liked , clicking again leads in removing the like
            presentFlag = 1;
          }
        }

        try {
          const user_details = await userinfo.findById(userid);
          if (presentFlag === 1) {
            isLiked = false;
            for (let i = 0; i <= user_details.liked.length; i++) {
              if (user_details.liked[i].title === req.params.title) {
                user_details.liked.splice(i, 1);
              }
              console.log(req.params.title);
              console.log("Hello in Another Try");
            }
            // user_details.liked.splice(
            //   user_details.liked.indexOf(req.params.title),
            //   1
            // ); // Remove from the liked array in userInfo Schema
            liked_users_data.splice(
              liked_users_data.indexOf(req.user.username),
              1
            );
          } else {
            isLiked = true;
            user_details.liked.push(req.body);
            liked_users_data.push(req.user.username);
          }
          user_details.save();
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
              liked: isLiked,
            });
          } catch {
            res.status(400).json({
              success: false,
              message: "replace Failed",
            });
          }
        } catch (err) {
          console.log(err.message);
          res.status(400).json({
            success: false,
            messsage: "user Not found",
          });
        }
      } else {
        let obj = {
          title: req.params.title,
          likes: 1,
          liked_users: [req.user.username],
        };

        try {
          const item = await reactionInfo.create(obj);
          try {
            const user_details = await userinfo.findById(userid);
            user_details.liked.push(req.body);
            user_details.save();
          } catch (err) {
            console.log(err.message);
          }
          res.status(200).json({
            success: true,
            likes: item.likes,
            liked: isLiked,
          });
        } catch (err) {
          res.status(400).json({
            success: false,
            message: "creating an entry in database failed",
          });
        }
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  } else {
    console.log("log out");
    res.send({ status: "not login" });
  }
};
