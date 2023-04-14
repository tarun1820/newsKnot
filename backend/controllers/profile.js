const userinfo = require("../models/user");
const path = require("path");

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

      const file = req.files[0];

      // Make sure that file is a photo

      if (!file.mimetype.startsWith("image")) {
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

      file.name = `photo_${userId}_${Date.now().toString()}${
        path.parse(file.name).ext
      }`;
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
        if (!user) {
          return res.status(402).json({
            success: false,
            message:
              "Some weird error already login , so this should not come while getting user Details",
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
        message: "database fetching failed",
      });
    }
  }
};

exports.getBlogArticles = async (req, res, next) => {
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
    let blog_articles = user.blogs;
    res.status(200).json({
      success: true,
      blogs: blog_articles,
    });
  } catch {
    res.status(400).json({
      success: false,
      message: 'Database operation failed',
    });
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
          "Some weird error already login , so this should not come while getting user Details",
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
      message: "Database operation failed",
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
          "Some weird error already login , so this should not come while getting user Details",
      });
    }
    let li = user.liked;
    let liked_articles = [];
    for (let i = 0; i < li.length; i++) {
      liked_articles.push(li[i].article);
    }
    res.status(200).json({
      success: true,
      liked: liked_articles,
    });
  } catch {
    res.status(400).json({
      success: false,
      message: "Database operation failed",
    });
  }
};

exports.editProfilePostForm = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const details = req.body;
    const userId = req.user.id;

    const allLinks = [];
    allLinks.push(details.link1);
    allLinks.push(details.link2);
    allLinks.push(details.link3);
    allLinks.push(details.link4);
    try {
      const user = await userinfo.findByIdAndUpdate(userId, {
        FirstName: details.FirstName,
        LastName: details.LastName,
        Bio: details.Bio,
        Org: details.Org,
        links: allLinks,
      });

      if (!user) {
        return res.status(402).json({
          success: false,
          message:
            "Some weird error already login , so this should not come while getting user Details",
        });
      }
      res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
      });
    } catch {
      res.status(400).json({
        success: false,
        message: "Database operation failed",
      });
    }
  }
};

exports.getProfileDetails = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    try {
      const user = await userinfo.findById(userId);
      var data = {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Bio: user.Bio,
        Org: user.Org,
        link1: user.links[0],
        link2: user.links[1],
        link3: user.links[2],
        link4: user.links[3],
        photo: user.profilePhoto,
      };
      res.status(200).json({
        success: true,
        details: data,
      });
    } catch {
      res.status(400).json({
        success: false,
        message: "Database operation failed",
      });
    }
  }
};
