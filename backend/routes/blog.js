const express = require('express');

const { getAllBlogs, PostBlog } = require('../controllers/blog');

const router = express.Router();

router.route('/user/blog/write').post(PostBlog);
router.route('/user/blog/user_blogs').get(getAllBlogs);

module.exports = router;
