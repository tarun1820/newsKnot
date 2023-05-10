const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    blogName: {
      type: String,
      required: true,
    },
    AuthorName: {
      type: String,
      required: true,
    },
    Subject: {
      type: String,
      required: true,
    },
    UploaderPhoto: {
      type: String,
      default: 'random.png',
    },
    Description: {
      type: String,
      required: true,
    },
    UploadedTime: {
      type: Date,
      default: Date.now(),
    },
    Related: {
      type: [String],
    },
  },
  {
    collection: 'blogInfo',
  }
);

module.exports = mongoose.model('blogInfo', blogSchema);
