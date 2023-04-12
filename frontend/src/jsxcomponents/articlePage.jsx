import "../cssfiles/articlePage/mainPageArticle.css";
import Discussions from "../articlePageComponents/discussions";
import ArticleData from "../articlePageComponents/articleData";
import Footer from "../StandardComponents/JsxFiles/Footer";
import Button from "../StandardComponents/JsxFiles/button";
import Line from "../StandardComponents/JsxFiles/line";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "'Montserrat', sans-serif",
      textTransform: "none",
    },
    button: {
      fontFamily: "'Montserrat', sans-serif",
      textTransform: "none",
      fontSize: 20,
    },
  },
  palette: {
    primary: {
      main: "#000000",
      dark: "#ffffff",
    },
    secondary: {
      main: "#537FE7",
      dark: "#537FE7",
    },
  },
});

function ArticlePage(props) {
  const [pageload, setpageload] = useState(0);
  const { articleurl } = useParams();
  const Articledata = JSON.parse(articleurl);
  console.log("article data from article page=", Articledata);
  const navigate = useNavigate();
  const location = useLocation();
  // const username = location.state.username;
  // const Articledata = location.state.article_data;
  const [username, setUsername] = useState("");
  const [photoName, setPhotoName] = useState("random.png");
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
          setUsername(res.data.username);
          // setNews(res.data.articles);
          // add image here by creating profile pic state
          setpageload(1);
          setPhotoName(res.data.profile_pic);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {pageload === 1 ? (
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
          <Discussions
            title={Articledata.title}
            username={username}
            profile_pic={photoName}
          ></Discussions>
          <Line></Line>
          <Footer></Footer>
        </div>
      ) : (
        <div className="newspage_Progress">
          <CircularProgress
            variant="indeterminate"
            color="secondary"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "100%",
              boxShadow: "inset 0 0 0px 15px #ECF2FF",
              backgroundColor: "transparent",
            }}
            thickness={5}
          />
        </div>
      )}{" "}
      ;
    </div>
  );
}

export default ArticlePage;
