const express = require('express');

const {
  getUserDetails,
  getSavedArticles,
  getLikedArtcles,
  photoUpload,
  editProfilePostForm,
  getProfileDetails,
  getPhoto,
} = require('../controllers/profile');

const router = express.Router();

//router.route('/user/profile').get(getUserDetails);

router.route('/user/profile/saved').get(getSavedArticles);
router.route('/user/profile/liked').get(getLikedArtcles);
router.route('/user/profile/edit/photo').post(photoUpload);
router.route('/user/profile/edit/photo').get(getPhoto);
router.route('/user/profile/edit').post(editProfilePostForm);
router.route('/user/profile/edit').get(getProfileDetails);

module.exports = router;
