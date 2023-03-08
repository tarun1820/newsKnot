const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('17fd79449aed499ea71d113d678dea49');

exports.PostNewsArticlesFromAPI = (req, res, next) => {
  let category = req.body.category || 'general';
  // console.log(category)
  newsapi.v2
    .topHeadlines({
      category: category,
      country: req.body.country || 'in',
      pageSize: 20,
    })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.GetNewsArticles = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.send(req.session.passport.user);
  } else {
    res.send({ status: 'not login' });
  }
};
