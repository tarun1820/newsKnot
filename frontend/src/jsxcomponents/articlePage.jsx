import "../cssfiles/articlePage/mainPageArticle.css";
import Discussions from "../articlePageComponents/discussions";
import ArticleData from "../articlePageComponents/articleData";
import Footer from "../StandardComponents/JsxFiles/Footer";
import Button from "../StandardComponents/JsxFiles/button";
import Line from "../StandardComponents/JsxFiles/line";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
function ArticlePage(props) {
  const { articleurl } = useParams();
  const Articledata = JSON.parse(articleurl);
  console.log("article data from article page=", Articledata);
  const navigate = useNavigate();
  const location = useLocation();
  // const username = location.state.username;
  // const Articledata = location.state.article_data;
  const [username, setUsername] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
      .then((res) => {
        // console.log(res);
        if (res.data.status === "not login") {
          navigate("/login", {
            state: {
              url: "/user/article",
              article_data: encodeURIComponent(articleurl),
            },
          });
        } else {
          setUsername(res.data);
          // setNews(res.data.articles);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="article_page_header">
        <div className="article_page_proName">NewsKnot</div>
        <div className="article_page_btns">
          <div className="article_page_feed_btn">
            <Button link="/user">Feed</Button>
          </div>
        </div>
      </div>
      <ArticleData article_data={Articledata}></ArticleData>
      <Line></Line>
      <Discussions title={Articledata.title} username={username}></Discussions>
      <Line></Line>
      <Footer></Footer>
    </div>
  );
}

export default ArticlePage;
