const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
const userSchema = new mongoose.Schema(
  {
    username: String,
    email: { type: String, unique: true },
    password: String,
    saved: [Object],
  },
  {
    collection: 'userinfo',
  }
);
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('userinfo', userSchema);
