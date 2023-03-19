const express = require('express');

const {
  getUserDetails,
  getSavedArticles,
  getLikedArtcles,
  photoUpload,
} = require('../controllers/profile');

const router = express.Router();

//router.route('/user/profile').get(getUserDetails);

router.route('/user/profile/saved').get(getSavedArticles);

router.route('/user/profile/liked').get(getLikedArtcles);

router.route('user/profile/photo').put(photoUpload);

module.exports = router;
