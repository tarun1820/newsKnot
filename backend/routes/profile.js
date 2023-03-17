const express = require('express');

const {
  getUserDetails,
  getSavedArticles,
  getLikedArtcles,
} = require('../controllers/profile');

const router = express.Router();

//router.route('/user/profile').get(getUserDetails);

router.route('/user/profile/saved').get(getSavedArticles);

router.route('/user/profile/liked').get(getLikedArtcles);

module.exports = router;
