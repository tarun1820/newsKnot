const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("17fd79449aed499ea71d113d678dea49");
const userinfo = require("../models/user");
exports.PostNewsArticlesFromAPI = async (req, res, next) => {
  if (req.body.category === null) {
    // console.log("null");
    const username = req.body.username;
    // const email = req.user.email;
    // console.log("username=", email);
    const userdata = await userinfo.findOne({ username });
    // const [sport_art, health_art, tech_art, entertain_art] =
    //   userdata.latent_features;
    // console.log("sports=", sport_art);
    const prop_vec = [0.2, 0.3, 0.1, 0.4];
    console.log(userdata);
    const sports_list = await newsapi.v2
      .topHeadlines({
        category: "sports",
        country: "in",
        pageSize: prop_vec[0] * 20,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.message;
      });
    const health_list = await newsapi.v2
      .topHeadlines({
        category: "health",
        country: "in",
        pageSize: prop_vec[1] * 20,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.message;
      });

    const tech_list = await newsapi.v2
      .topHeadlines({
        category: "technology",
        country: "in",
        pageSize: prop_vec[2] * 20,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.message;
      });

    const entertainment_list = await newsapi.v2
      .topHeadlines({
        category: "entertainment",
        country: "in",
        pageSize: prop_vec[3] * 20,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.message;
      });

    // console.log("sports list", sports_list);
    // console.log("entertin=", entertainment_list);
    const total_articles = sports_list.articles.concat(
      tech_list.articles,
      health_list.articles
    );
    // console.log("total articles=", total_articles);
    return res.send(total_articles);
  }

  let category = req.body.category;
  // console.log(category)
  newsapi.v2
    .topHeadlines({
      category: category || "sports",
      country: req.body.country || "in",
      pageSize: 20,
    })
    .then((response) => {
      res.send(response.articles);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.GetNewsArticles = (req, res, next) => {
  if (req.isAuthenticated()) {
    // console.log(req.session.);
    res.send(req.session.passport.user);
  } else {
    res.send({ status: "not login" });
  }
};
