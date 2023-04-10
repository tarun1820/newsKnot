import Card from "../StandardComponents/JsxFiles/card";
import "../cssfiles/News-Page/newsCardItem.css";
import Random from "../png&svg/random.png";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import ArrowDown from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";

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

function NewsCardItem(props) {
  // useEffect(fetchReactions,[]);
  var content = props.cardarticle.content;
  var image = props.cardarticle.urlToImage;
  let Title = props.cardarticle.title;
  // let en_title=encodeURIComponent(Title).substring(0,10);
  // console.log(en_title);
  const username = props.username;
  // console.log(" from new page usename==", username);

  const [reactions, setReactions] = useState(0);
  const [clickarticle, setClickArticle] = useState(false);
  const [icon, setIcon] = useState(0);

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
        console.log(err);
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

  return (
    <Card className="new_article__styles">
      <div className="article__container">
        <div>
          <img
            className="article__image"
            alt="img"
            src={image === null ? Random : image}
          ></img>
        </div>
        <div className="Content__container">
          <div className="title__article">
            <h1>{props.cardarticle.title}</h1>
          </div>
          <div>
            <p className="content__article">{content}</p>
          </div>
        </div>
      </div>

      <div className="article_bottom">
        {/* In this div keep saved liked and view More*/}

        <div className="article_reaction">
          <div>
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
          </div>
          <div>
            <label className="article_reaction_label">{reactions}</label>
          </div>
        </div>

        <div className="article_viewmore">
          <IconButton
            onClick={() => {
              setClickArticle(true);
            }}
          >
            <ArrowDown sx={{ color: "black", fontSize: 40 }} />
          </IconButton>
        </div>

        {props.save === false ? (
          <div className="bookmark_icon">
            <IconButton size="large" onClick={() => saveArticle(props)}>
              <BookmarkBorderIcon sx={{ color: "black", fontSize: 40 }} />
            </IconButton>
          </div>
        ) : (
          <div className="bookmark_icon"></div>
        )}
      </div>
    </Card>
  );
}

export default NewsCardItem;
