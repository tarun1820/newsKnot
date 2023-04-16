const express = require('express');

const {
  PostNewsArticlesFromAPI,
  GetUserDetails,
  PutUserProbability,
} = require('../controllers/newspage');

const router = express.Router();

router
  .route('/user')
  .post(PostNewsArticlesFromAPI)
  .get(GetUserDetails)
  .put(PutUserProbability);

module.exports = router;
