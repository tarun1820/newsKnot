const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.API_KEY2);

function caliculate_propbility(prop_vec, category_id) {
  const prop = prop_vec[category_id] / prop_vec[prop_vec.length - 1];
  // console.log(prop);
  return Math.round(20 * prop);
}

async function newsapireq(category, country, prop_vec, category_id) {
  // console.log("in side newsnot");
  const page_size = caliculate_propbility(prop_vec, category_id);
  console.log(page_size);
  const response = await newsapi.v2
    .topHeadlines({
      category: category,
      country: country,
      pageSize: page_size,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.message;
    });
  // console.log(response);
  return response;
}

module.exports = { caliculate_propbility, newsapireq };
