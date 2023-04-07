import { useEffect } from "react";
import "../cssfiles/articlePage/articleData.css";
import axios from "axios";
// import { useLocation } from "react-router-dom";
import Random from "../png&svg/random.png";
// import io from "socket.io-client";
// import { useEffect, useState } from "react";

// const socket = io.connect("http://localhost:5000");

function ArticleData(props) {
  // const location = useLocation();
  const data = props.article_data;
  console.log("from article data=", data.description);
  const username = props.username;
  var content = data.content;
  var image = data.urlToImage;
  var title = data.title;
  var author = data.author;
  var description = data.description;
  var url = data.url;
  const encoded = encodeURIComponent(url);
  // useEffect(() => {
  //   console.log("scraping req sent from front end");
  //   axios
  //     .get(`http://localhost:5000/news_article/${encoded}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log(res.textcontent);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div>
      <div>
        <div>
          <img
            className="article__image"
            alt="img"
            src={image === null ? Random : image}
          ></img>
        </div>
        <div className="Content__container">
          <div className="title__article">
            <h1>{title}</h1>
          </div>
          <div>
            <span>
              <p>author</p>
            </span>
            <h4>{author}</h4>
            <p className="content__article">{description}</p>
          </div>
        </div>
      </div>
      {/* <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button> */}
    </div>
  );
}

export default ArticleData;
