const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    saved: [Object],
    liked: [Object],
    FirstName: { type: String, default: '' },
    LastName: { type: String, default: '' },
    Bio: { type: String, default: '' },
    Org: { type: String, default: '' },
    links: { type: [String], default: ['', '', '', ''] },
    profilePhoto: { type: String, default: 'no-photo.jpg' },
  },
  {
    collection: 'userinfo',
  }
);
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('userinfo', userSchema);
