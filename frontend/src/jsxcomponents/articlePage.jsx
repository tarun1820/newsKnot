import "../cssfiles/articlePage/mainPageArticle.css";
import Discussions from "../articlePageComponents/discussions";
import ArticleData from "../articlePageComponents/articleData";
import Footer from "../StandardComponents/JsxFiles/Footer";
import Button from "../StandardComponents/JsxFiles/button";
import Line from "../StandardComponents/JsxFiles/line";
import { useLocation } from "react-router-dom";
function ArticlePage(props) {
  const location = useLocation();
  const username = location.state.username;
  const Articledata = location.state.article_data;
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
