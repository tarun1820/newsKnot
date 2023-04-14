import axios from "axios";
import { React, useState, useEffect } from "react";
import NewsCardItem from "../NewsPageComponents/newsCardItem";
import "../cssfiles/News-Page/main_page.css";
import { useNavigate, useLocation } from "react-router-dom";
import MyButton from "../StandardComponents/JsxFiles/button";
import Line from "../StandardComponents/JsxFiles/line";
import { Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
    if (!username) {
      return;
    }
    const data = JSON.stringify({ category, username });
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
  useEffect(topHeadlinesArticals, [category, username]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        {userfound === 2 ? (
          <div>
            <div className="navbar_newspage_header">
              <div className="proName_newspage">NewsKnot</div>
              <div className="navbar_newspage_btns">
                <Tooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  title="View Profile"
                  arrow
                >
                  <Button onClick={() => navigate("/user/profile")}>
                  <img
                  className="profile_image"
                  src={`http://localhost:5000/uploads/${photoName}`}
                  alt="NI"
                  />
                  <p className = "newspage_username">{username}</p>
                  </Button>
                </Tooltip>
                <Tooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  title="Write A Blog"
                  arrow
                >
                  <IconButton onClick={() => navigate("/user/profile")}>
                    <AddCircleIcon sx={{ color: "gold", fontSize: 40 }} />
                  </IconButton>
                </Tooltip>
                <div className="navbar_newspage_btn">
                  <MyButton link="/logout"> Logout </MyButton>
                </div>
              </div>
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
