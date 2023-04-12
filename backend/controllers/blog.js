const blogInfo = require('../models/blog');
const userinfo = require('../models/user');

exports.getAllBlogs = async (req, res, next) => {
  console.log('Get All blogs Request');
  if (req.isAuthenticated()) {
    try {
      const blogs = await blogInfo.find();
      res.status(200).json({
        success: true,
        msg: 'Get request Successfull',
        data: blogs,
      });
    } catch {
      res.status(400).json({
        success: false,
        msg: 'Get All blogs request failed',
      });
    }
  }
};

exports.PostBlog = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const blog = req.body;
    try {
      const newblog = await blogInfo.create(blog);
      // This created blog should also appended to Blogs attribute of respective customer for further uses.
      const userId = req.user.id;
      try {
        let user = await userinfo.findById(userId);
        user.blogs.push(newblog);
        res.status(200).json({
          success: true,
          blog: newblog,
          userBlog_count: user.blogs.length,
          msg: 'blog post request successful',
        });
      } catch {
        res.status(400).json({
          success: false,
          msg: 'Blog appending to respective customer blog attribute failed',
        });
      }
    } catch {
      res.status(400).json({
        success: false,
        msg: 'Post Blog request failed',
      });
    }
  }
};
