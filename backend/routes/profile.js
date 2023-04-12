const express = require('express');

const {
  getSavedArticles,
  getLikedArtcles,
  photoUpload,
  editProfilePostForm,
  getProfileDetails,
  getBlogArticles,
} = require('../controllers/profile');

const router = express.Router();

router.route('/user/profile/saved').get(getSavedArticles);
router.route('/user/profile/liked').get(getLikedArtcles);
router.route('/user/profile/edit/photo').post(photoUpload);
router.route('/user/profile/edit').post(editProfilePostForm);
router.route('/user/profile').get(getProfileDetails);
router.route('/user/profile/blogs').get(getBlogArticles);

module.exports = router;
