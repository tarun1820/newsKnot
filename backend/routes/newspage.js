const express = require("express");

const {
  PostNewsArticlesFromAPI,
  GetUserDetails,
} = require("../controllers/newspage");

const router = express.Router();

router.route("/user").post(PostNewsArticlesFromAPI).get(GetUserDetails);

module.exports = router;
