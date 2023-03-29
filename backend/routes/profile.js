const express = require('express');

const {
  getUserDetails,
  getSavedArticles,
  getLikedArtcles,
  photoUpload,
  editProfilePostForm,
  getProfileEditDetails,
} = require('../controllers/profile');

const router = express.Router();

//router.route('/user/profile').get(getUserDetails);

router.route('/user/profile/saved').get(getSavedArticles);

router.route('/user/profile/liked').get(getLikedArtcles);

router.route('user/profile/photo').put(photoUpload);

router.route('/user/profile/edit').post(editProfilePostForm);

router.route('/user/profile/edit').get(getProfileEditDetails);

module.exports = router;
