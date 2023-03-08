const express = require('express');

const {
  PostNewsArticlesFromAPI,
  GetNewsArticles,
} = require('../controllers/newspage');

const router = express.Router();

router.route('/user').post(PostNewsArticlesFromAPI).get(GetNewsArticles);

module.exports = router;
