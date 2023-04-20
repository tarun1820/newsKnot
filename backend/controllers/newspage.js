const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY3);
const userinfo = require('../models/user');
const handle_fun = require('./probabilityFunction');
exports.PostNewsArticlesFromAPI = async (req, res, next) => {
  if (req.body.category === null) {
    // console.log("null");

    const username = req.user.username;

    const userdata = await userinfo.findOne({ username });

    const prop_vec = userdata.latent_features;
    const country = req.body.country.toLowerCase();
    let sports_list = await handle_fun.newsapireq(
      'sports',
      country,
      prop_vec,
      0
    );
    let health_list = await handle_fun.newsapireq(
      'health',
      country,
      prop_vec,
      1
    );
    let tech_list = await handle_fun.newsapireq(
      'technology',
      country,
      prop_vec,
      2
    );
    let entertainment_list = await handle_fun.newsapireq(
      'entertainment',
      country,
      prop_vec,
      3
    );
    let science_list = await handle_fun.newsapireq(
      'science',
      country,
      prop_vec,
      4
    );
    let business_list = await handle_fun.newsapireq(
      'business',
      country,
      prop_vec,
      5
    );

    sports_list = sports_list.articles.map((single_article) => {
      single_article.displayTitle = single_article.title;
      single_article.title = single_article.title.replaceAll('?', ' ');
      single_article.title = single_article.title.replaceAll('%', ' ');
      single_article['category'] = 'sports';
      single_article['category_id'] = 0;
      return single_article;
    });
    tech_list = tech_list.articles.map((single_article) => {
      single_article.displayTitle = single_article.title;
      single_article.title = single_article.title.replaceAll('?', ' ');
      single_article.title = single_article.title.replaceAll('%', ' ');
      single_article['category'] = 'tech';
      single_article['category_id'] = 1;
      return single_article;
    });
    health_list = health_list.articles.map((single_article) => {
      single_article.displayTitle = single_article.title;
      single_article.title = single_article.title.replaceAll('?', ' ');
      single_article.title = single_article.title.replaceAll('%', ' ');
      single_article['category'] = 'health';
      single_article['category_id'] = 2;
      return single_article;
    });
    entertainment_list = entertainment_list.articles.map((single_article) => {
      single_article.displayTitle = single_article.title;
      single_article.title = single_article.title.replaceAll('?', ' ');
      single_article.title = single_article.title.replaceAll('%', ' ');
      single_article['category'] = 'entertainment';
      single_article['category_id'] = 3;
      return single_article;
    });
    science_list = science_list.articles.map((single_article) => {
      single_article.displayTitle = single_article.title;
      single_article.title = single_article.title.replaceAll('?', ' ');
      single_article.title = single_article.title.replaceAll('%', ' ');
      single_article['category'] = 'entertainment';
      single_article['category_id'] = 4;
      return single_article;
    });

    business_list = business_list.articles.map((single_article) => {
      single_article.displayTitle = single_article.title;
      single_article.title = single_article.title.replaceAll('?', ' ');
      single_article.title = single_article.title.replaceAll('%', ' ');
      single_article['category'] = 'busin';
      single_article['category_id'] = 5;
      return single_article;
    });
    let total_articles = sports_list.concat(
      tech_list,
      health_list,
      entertainment_list,
      science_list,
      business_list
    );

    function shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    }

    shuffle(total_articles);

    return res.send(total_articles);
  }

  let category = req.body.category;
  console.log(req.body.country);
  newsapi.v2
    .topHeadlines({
      category: category,
      country: req.body.country,
      pageSize: 30,
    })
    .then((response) => {
      let id = 0;

      if (category === 'health') {
        id = 1;
      } else if (category === 'technology') {
        id = 2;
      } else if (category === 'entertainment') {
        id = 3;
      } else if (category === 'science') {
        id = 4;
      } else if (category === 'business') {
        id = 5;
      }

      cat_article = response.articles;
      cat_article = cat_article.map((single_article) => {
        single_article.displayTitle = single_article.title;
        single_article.title = single_article.title.replaceAll('?', ' ');
        single_article.title = single_article.title.replaceAll('%', ' ');
        // console.log(single_article);
        single_article['category'] = category;
        single_article['category_id'] = id;
      });
      res.send(response.articles);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.GetUserDetails = async (req, res, next) => {
  if (req.isAuthenticated()) {
    // console.log(req.session.);
    const username = req.session.passport.user;
    const userdata = await userinfo.findOne({ username });
    res.send({ username: username, profile_pic: userdata.profilePhoto });
  } else {
    res.send({ status: 'not login' });
  }
};

exports.PutUserProbability = async (req, res, next) => {
  const username = req.body.username;
  const category = req.body.category;
  const category_id = req.body.category_id;
  const userdata = await userinfo.findOne({ username });
  const [sports, health, tech, entertainment, science, business] = [
    0, 1, 2, 3, 4, 5,
  ];
  if (userdata) {
    let latent_features = userdata.latent_features;
    console.log(category_id);
    latent_features[category_id] = latent_features[category_id] + 1;
    latent_features[latent_features.length - 1] =
      latent_features[latent_features.length - 1] + 1;
    //console.log('laten update=', latent_features);
    // latent_features = normalise(latent_features);
    //console.log('laten update=', latent_features);
    const user_data = await userinfo.findOneAndUpdate(
      {
        username,
      },
      { latent_features },
      {
        new: true,
      }
    );
  }
};
