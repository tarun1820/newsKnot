const express = require("express");

const {
  PostNewsArticlesFromAPI,
  GetUserDetails,
  PutUserPropability,
} = require("../controllers/newspage");

const router = express.Router();

router
  .route("/user")
  .post(PostNewsArticlesFromAPI)
  .get(GetUserDetails)
  .put(PutUserPropability);

module.exports = router;
