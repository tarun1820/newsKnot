const express = require('express');

const { getSavedArticles, createSavedArtcle } = require('../controllers/save');

const router = express.Router();

router.route('/save').post(createSavedArtcle);

module.exports = router;
