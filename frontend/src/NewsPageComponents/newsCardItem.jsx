import Card from "../StandardComponents/JsxFiles/card";
import "../cssfiles/News-Page/newsCardItem.css";
import Random from "../png&svg/random.png";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ArrowDown from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";

function NewsCardItem(props) {
  var content = props.cardarticle.content;
  var image = props.cardarticle.urlToImage;
  let Title = props.cardarticle.title;
  const disptitle = props.cardarticle.displayTitle;
  const username = props.username;

  const [reactions, setReactions] = useState(0);
  const [clickarticle, setClickArticle] = useState(false);
  const [icon, setIcon] = useState(0);
  const [transform, setTransform] = useState([-90, 0]);

  function saveArticle(newsArticle) {
    const options = {
      withCredentials: true,
      headers: { "content-type": "application/json" },
    };
    axios
      .post("http://localhost:5000/save", newsArticle, options)
      .then((res) => {
        //console.log(res.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (clickarticle === true) {
      const data = {
        category: props.cardarticle.category,
        category_id: props.cardarticle.category_id,
        username: username,
      };
      const articledata = JSON.stringify(props.cardarticle);
      const aricles_info = encodeURIComponent(articledata);
      console.log("articledata.category_id,==", articledata);

      axios
        .put("http://localhost:5000/user", data, { withCredentials: true })
        .then((res) => {
          console.log(res.status);
        })
        .then((err) => {
          console.log(err);
        });
      console.log(props.cardarticle);
      navigate(`/user/article/${aricles_info}`, {
        state: { article_data: props.cardarticle, username: username },
      });
    }
  }, [clickarticle]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/${Title}`, { withCredentials: true })
      .then((res) => {
        if (res.data.success === true) {
          if (res.data.liked === true) {
            setIcon(1);
          } else {
            setIcon(0);
          }
          setReactions(() => {
            return res.data.likes;
          });
        } else {
          if (res.data.error_id === 0) {
            setReactions(() => {
              return 0;
            });
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function likeHandler(e) {
    let data = {
      title: Title,
      article: props.cardarticle,
    };
    let a = 0;
    const options = {
      withCredentials: true,
      headers: { "content-type": "application/json" },
    };
    axios
      .post(`http://localhost:5000/user/${Title}`, data, options)
      .then((res) => {
        a = res.data.likes;
        setReactions(a);
        res.data.liked === true ? setIcon(1) : setIcon(0);
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log("Icon" + icon);
  }

  const divStyles = {
    transform: `translate(${0}px, ${transform[0]}px)`,
    opacity: transform[1],
    background: "#ECF2FF",
    borderRadius: "10px",
  };

  return (
    <div>
      <Card className="new_article__styles">
        <div
          className="article__container"
          onMouseOut={() => setTransform([-90, 0])}
          onMouseOver={() => setTransform([-30, 1])}
        >
          <div>
            <img
              className="article__image"
              alt="img"
              src={image === null ? Random : image}
            ></img>
          </div>
          <div className="Content__container">
            <div className="title__article">
              <h1>{disptitle}</h1>
            </div>
            <div>
              <p className="content__article">{content}</p>
            </div>
          </div>
        </div>
      </Card>
      <div
        className="article_bottom"
        style={divStyles}
        onMouseOut={() => setTransform([-90, 0])}
        onMouseOver={() => setTransform([-30, 1])}
      >
        {/* In this div keep saved liked and view More*/}

        <div className="article_reaction">
          <div>
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Add Like"
              arrow
            >
              {icon === 1 ? (
                <FavoriteOutlinedIcon
                  onClick={likeHandler}
                  sx={{ color: "red", fontSize: 30 }}
                ></FavoriteOutlinedIcon>
              ) : (
                <FavoriteBorderOutlinedIcon
                  onClick={likeHandler}
                  sx={{ color: "red", fontSize: 30 }}
                ></FavoriteBorderOutlinedIcon>
              )}
            </Tooltip>
          </div>
          <div>
            <label className="article_reaction_label">{reactions}</label>
          </div>
        </div>

        <div className="article_viewmore">
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title="View more"
            arrow
          >
            <IconButton
              onClick={() => {
                setClickArticle(true);
              }}
            >
              <ArrowDown sx={{ color: "black", fontSize: 40 }} />
            </IconButton>
          </Tooltip>
        </div>

        {props.save === false ? (
          <div className="bookmark_icon">
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Bookmark Article"
              arrow
            >
              <IconButton size="large" onClick={() => saveArticle(props)}>
                <BookmarkBorderIcon sx={{ color: "black", fontSize: 40 }} />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <div className="bookmark_icon"></div>
        )}
      </div>
    </div>
  );
}

export default NewsCardItem;
