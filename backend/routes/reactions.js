const express = require('express');

const { getReactions, putReactions } = require('../controllers/reactions');

const router = express.Router();

router.route('/user/:title').get(getReactions).post(putReactions);

module.exports = router;
