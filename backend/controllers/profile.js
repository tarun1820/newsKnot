const userinfo = require('../models/user');
const path = require('path');

// Uploading a photo to user Schema

exports.photoUpload = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    try {
      if (!req.files) {
        return res.status(403).json({
          success: false,
          message: `Please upload the file`,
        });
      }

      const file = req.files.file;

      // Make sure that file is a photo

      if (!file.mimetype.startsWith('image')) {
        return res.status(400).json({
          success: false,
          message: `Please upload an image file`,
        });
      }

      // Check file size

      if (file.size > process.env.MAX_FILE_UPLOAD) {
        return res.status(400).json({
          success: false,
          message: `Please upload the file less than ${process.env.MAX_FILE_UPLOAD}`,
        });
      }
      // Create custom fileName

      file.name = `photo_${userID}${path.parse(file.name).ext}`;
      file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: `Problem with file Upload`,
          });
        }

        const user = await userinfo.findByIdAndUpdate(userId, {
          profilePhoto: file.name,
        });
        if (!userDetails) {
          return res.status(402).json({
            success: false,
            message:
              'Some weird error already login , so this should not come while getting user Details',
          });
        }

        res.status(200).json({
          success: true,
          data: file.name,
        });
      });
    } catch {
      res.status(400).json({
        success: false,
        message: 'database fetching failed',
      });
    }
  }
};

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
    let liked_articles = [];
    for (let i = 0; i < li.length; i++) {
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
