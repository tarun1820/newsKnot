const userinfo = require('../models/user');

exports.getUserDetails = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    try {
      const userDetails = await userinfo.findById(userId);
      if (!userDetails) {
        return res.status(402).json({
          success: false,
          message:
            'Some weird error already login , so this should not come while getting user Details',
        });
      }
      res.status(200).json({
        username: userDetails.username,
        email: userDetails.email,
      });
    } catch {
      res.status(400).json({
        success: false,
        message: 'database fetching failed',
      });
    }
  } else {
    console.log('log out');
    res.send({ status: 'not login' });
  }
};

exports.getSavedArticles = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await userinfo.findById(userId);
    if (!user) {
      return res.status(402).json({
        success: false,
        message:
          'Some weird error already login , so this should not come while getting user Details',
      });
    }
    let saved_articles = user.saved;
    res.status(200).json({
      success: true,
      saved: saved_articles,
    });
  } catch {
    res.status(400).json({
      success: false,
      message: 'Database operation failed',
    });
  }
};

exports.getLikedArtcles = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await userinfo.findById(userId);
    if (!user) {
      return res.status(402).json({
        success: false,
        message:
          'Some weird error already login , so this should not come while getting user Details',
      });
    }
    let li = user.liked;
    console.log(li);
    let liked_articles = [];
    console.log('Hello');
    for (let i = 0; i < li.length; i++) {
      console.log(li[i]);
      liked_articles.push(li[i].article);
    }
    console.log(liked_articles);
    res.status(200).json({
      success: true,
      liked: liked_articles,
    });
  } catch {
    res.status(400).json({
      success: false,
      message: 'Database operation failed',
    });
  }
};
