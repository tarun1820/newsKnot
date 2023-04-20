import axios from "axios";
import { React, useState, useEffect } from "react";
import NewsCardItem from "../NewsPageComponents/newsCardItem";
import "../cssfiles/News-Page/main_page.css";
import { useNavigate } from "react-router-dom";
import Line from "../StandardComponents/JsxFiles/line";
import { Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Header from '../NewsPageComponents/Header'

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

function Newspage() {
  const [userfound, setuserfound] = useState(0);

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [photoName, setPhotoName] = useState("random.png");
  const [country, setcountry] = useState("in");
  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
      .then((res) => {
        if (res.data.status === "not login") {
          setuserfound(1);
          navigate("/login");
        } else {
          setUsername(res.data.username);
          setuserfound(2);
          setPhotoName(res.data.profile_pic);
          // add image here by creating profile pic state
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [category, setcategory] = useState(null);
  const [loader, setloader] = useState(true);
  const [topHeadlinesNews, setNews] = useState([]);

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  function topHeadlinesArticals() {
    console.log(country);
    if (!username) {
      return;
    }
    const data = JSON.stringify({ category, username, country });
    const options = {
      withCredentials: true,
      headers: { "content-type": "application/json" },
    };
    sleep(2000);
    axios
      .post("http://localhost:5000/user", data, options)
      .then((res) => {
        setNews(res.data);
        setloader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleChange(name) {
    // console.log(name)
    setcategory(name);
  }

  function countrychanged(e) {
    setloader(true);
    setcountry(e.target.value);
    // console.log(country);
  }
  useEffect(topHeadlinesArticals, [category, country, username]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        {userfound === 2 ? (
          <div>
            <div>
              <Header user = {username} photo = {photoName}/>
            </div>
            <div className="navbar_newspage">
              <Button
                variant="text"
                size="medium"
                onClick={() => {
                  handleChange("sports");
                  setloader(true);
                }}
              >
                Sports
              </Button>
              <Button
                variant="text"
                size="medium"
                onClick={() => {
                  handleChange("health");
                  setloader(true);
                }}
              >
                Health
              </Button>
              <Button
                variant="text"
                size="medium"
                onClick={() => {
                  handleChange("entertainment");
                  setloader(true);
                }}
              >
                Entertainment
              </Button>
              <Button
                variant="text"
                size="medium"
                onClick={() => {
                  handleChange("technology");
                  setloader(true);
                }}
              >
                Technology
              </Button>
              <Button
                variant="text"
                size="medium"
                onClick={() => {
                  handleChange("science");
                  setloader(true);
                }}
              >
                Science
              </Button>
              <Button
                variant="text"
                size="medium"
                onClick={() => {
                  handleChange("business");
                  setloader(true);
                }}
              >
                Business
              </Button>
              <div className="App">
                <select onChange={countrychanged}>
                  <option value="in">INDIA</option>
                  <option value="us">USA</option>
                  <option value="cn">CHINA</option>
                  <option value="ru">RUSSIA</option>
                </select>
              </div>
            </div>
            <Line className="newspage_line" />

            {loader === true ? (
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
            ) : (
              topHeadlinesNews.map((article) => {
                return (
                  <NewsCardItem
                    username={username}
                    key={Math.random()}
                    save={false}
                    cardarticle={article}
                    likes={0}
                    dislikes={0}
                  />
                );
              })
            )}
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
        )}
      </ThemeProvider>
    </div>
  );
}

export default Newspage;
