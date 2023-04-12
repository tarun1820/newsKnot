const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.API_KEY1);
const userinfo = require("../models/user");
exports.PostNewsArticlesFromAPI = async (req, res, next) => {
  if (req.body.category === null) {
    // console.log("null");

    const username = req.user.username;

    const userdata = await userinfo.findOne({ username });

    const prop_vec = userdata.latent_features;
    // console.log(userdata);
    let sports_list = await newsapi.v2
      .topHeadlines({
        category: "sports",
        country: "in",
        pageSize: 20,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.message;
      });
    let health_list = await newsapi.v2
      .topHeadlines({
        category: "health",
        country: "in",
        pageSize: 20,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.message;
      });

    let tech_list = await newsapi.v2
      .topHeadlines({
        category: "technology",
        country: "in",
        pageSize: 20,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.message;
      });

    let entertainment_list = await newsapi.v2
      .topHeadlines({
        category: "entertainment",
        country: "in",
        pageSize: 20,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.message;
      });

    // console.log("entertin=", entertainment_list);
    // const art = "sjkjjf % dffkjfk % %% jbdwfwf ??erefheroife";

    // console.log(art.replaceAll("?", "-"));
    sports_list = sports_list.articles.map((single_article) => {
      single_article.displayTitle = single_article.title;
      single_article.title = single_article.title.replaceAll("?", " ");
      single_article.title = single_article.title.replaceAll("%", " ");
      single_article["category"] = "sports";
      single_article["category_id"] = 0;
      // console.log(single_article);
      return single_article;
    });
    tech_list = tech_list.articles.map((single_article) => {
      single_article.displayTitle = single_article.title;
      single_article.title = single_article.title.replaceAll("?", " ");
      single_article.title = single_article.title.replaceAll("%", " ");
      single_article["category"] = "tech";
      single_article["category_id"] = 1;
      return single_article;
    });
    health_list = health_list.articles.map((single_article) => {
      single_article.displayTitle = single_article.title;
      single_article.title = single_article.title.replaceAll("?", " ");
      single_article.title = single_article.title.replaceAll("%", " ");
      single_article["category"] = "health";
      single_article["category_id"] = 2;
      return single_article;
    });
    entertainment_list = entertainment_list.articles.map((single_article) => {
      single_article.displayTitle = single_article.title;
      single_article.title = single_article.title.replaceAll("?", " ");
      single_article.title = single_article.title.replaceAll("%", " ");
      // console.log(single_article);
      single_article["category"] = "entertainment";
      single_article["category_id"] = 3;
      return single_article;
    });
    // console.log(sports_list);
    let total_articles = sports_list.concat(
      tech_list,
      health_list,
      entertainment_list
    );

    function shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    }

    shuffle(total_articles);

    // console.log("total articles=", total_articles);
    return res.send(total_articles);
  }

  let category = req.body.category;
  // console.log(category)
  newsapi.v2
    .topHeadlines({
      category: category,
      country: req.body.country || "in",
      pageSize: 20,
    })
    .then((response) => {
      const id = 0;
      if (category === "technology") {
        id = 1;
      } else if (category === "health") {
        id = 2;
      } else if (category === "entertainment") {
        id = 3;
      }
      cat_article = response.articles;
      cat_article = cat_article.map((single_article) => {
        single_article.displayTitle = single_article.title;
        single_article.title = single_article.title.replaceAll("?", " ");
        single_article.title = single_article.title.replaceAll("%", " ");
        // console.log(single_article);
        single_article["category"] = category;
        single_article["category_id"] = id;
      });
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
