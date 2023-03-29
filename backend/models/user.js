const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const findOrCreate = require("mongoose-findorcreate");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    socialId: { type: String, default: "" },
    saved: [Object],
    liked: [Object],
    FirstName: { type: String, default: "" },
    LastName: { type: String, default: "" },
    Bio: { type: String, default: "" },
    Org: { type: String, default: "" },
    links: { type: [String], default: ["", "", "", ""] },
    profilePhoto: { type: String, default: "no-photo.jpg" },
  },
  {
    collection: "userinfo",
  }
);
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
module.exports = mongoose.model("userinfo", userSchema);
