const express = require("express");

const {
  SignUpPostRequest,
  LoginPostRequest,
  LogoutGetRequest,
} = require("../controllers/authentication");

const router = express.Router();

router.route("/login").post(LoginPostRequest);
router.route("/signup").post(SignUpPostRequest);
router.route("/logout").get(LogoutGetRequest);

module.exports = router;
