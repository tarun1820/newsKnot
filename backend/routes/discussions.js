const express = require("express");

const { getDiscussions } = require("../controllers/discussions");

const router = express.Router();

router.route("/user/article/:title").get(getDiscussions);

module.exports = router;
