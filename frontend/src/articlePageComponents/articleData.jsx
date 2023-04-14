import { useEffect, useState } from "react";
import "../cssfiles/articlePage/articleData.css";
import axios from "axios";
import Parser from "html-react-parser";

function ArticleData(props) {
  // const location = useLocation();
  const data = props.article_data;
  console.log("from article data=", data.description);
  var author = data.author;
  var url = data.url;
  const [scrapeddata, setscrapeddata] = useState("");
  const encoded = encodeURIComponent(url);
  useEffect(() => {
    console.log("scraping req sent from front end");
    axios
      .get(`http://localhost:5000/news_article/?encodedurl=${encoded}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("text scaped=", res);
        setscrapeddata(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
        <div className="article_content_container">
            <div><h3 className = "article_author">Author : {author}</h3></div>
            <div className = "article_scraped_data">{Parser(scrapeddata)}</div>          
        </div>
    </div>
  );
}

export default ArticleData;
