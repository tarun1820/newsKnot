import axios from "axios";
import { React, useState, useEffect } from "react";
import NewsCardItem from "../NewsPageComponents/newsCardItem";
import "../cssfiles/News-Page/main_page.css";
import { useNavigate, useLocation } from "react-router-dom";
import MyButton from "../StandardComponents/JsxFiles/button";
import Line from "../StandardComponents/JsxFiles/line";
import { arrows_square_plus } from "react-icons-kit/linea/arrows_square_plus";
import { user } from "react-icons-kit/fa/user";
import { Icon } from "react-icons-kit";
import { Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

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
  },
});

function Newspage() {
  const [userfound, setuserfound] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
      .then((res) => {
        if (res.data.status === "not login") {
          setuserfound(1);
          navigate("/login");
        } else {
          setUsername(res.data);
          setuserfound(2);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [category, setcategory] = useState(null);

  const [topHeadlinesNews, setNews] = useState([]);

  function topHeadlinesArticals() {
    const data = JSON.stringify({ category, username });
    const options = {
      withCredentials: true,
      headers: { "content-type": "application/json" },
    };
    axios
      .post("http://localhost:5000/user", data, options)
      .then((res) => {
        setNews(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleChange(name) {
    // console.log(name)
    setcategory(name);
  }
  useEffect(topHeadlinesArticals, [category]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        {userfound === 2 ? (
          <div>
            <div className="navbar_newspage_header">
              <div className="proName_newspage">NewsKnot</div>
              <div className="navbar_newspage_btns">
                {/* Should change routes */}
                <div className="newspage__Icons">
                
                  <div
                    className="navbar_newspage_btn_icon"
                    onClick={() => navigate("/saved")}
                  >
                    <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    title="Add Like"
                    arrow >
                    <Icon size={32} icon={arrows_square_plus} />
                    </Tooltip>
                  </div>
                  <div
                    className="navbar_newspage_btn_icon"
                    onClick={() => navigate("/user/profile")}
                  >
                    <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    title="Add Like"
                    arrow >
                    <Icon size={32} icon={user} />
                    </Tooltip>
                  </div>
                </div>
                {/* <Button className = "navbar_newspage_btn" link = "/saved"  > Saved</Button> */}
                <div className="navbar_newspage_btn">
                  <MyButton link="/logout"> Logout </MyButton>
                </div>
              </div>
            </div>

            <div className="navbar_newspage">
              <Button
                variant="text"
                size="medium"
                onClick={() => handleChange("sports")}
              >
                Sports
              </Button>
              <Button
                variant="text"
                size="medium"
                onClick={() => handleChange("health")}
              >
                Health
              </Button>
              <Button
                variant="text"
                size="medium"
                onClick={() => handleChange("entertainment")}
              >
                Entertainment
              </Button>
              <Button
                variant="text"
                size="medium"
                onClick={() => handleChange("technology")}
              >
                Technology
              </Button>
              {/* <div
              className="navbar_newspage_item"
              onClick={() => handleChange("sports")}
            >
              Sports
            </div>
            <div
              className="navbar_newspage_item"
              onClick={() => handleChange("health")}
            >
              Health
            </div>
            <div
              className="navbar_newspage_item"
              onClick={() => handleChange("entertainment")}
            >
              Entertainment
            </div>
            <div
              className="navbar_newspage_item"
              onClick={() => handleChange("technology")}
            >
              Technology
              </div> */}
            </div>
            <Line className="newspage_line" />
            {topHeadlinesNews.map((article) => {
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
            })}
          </div>
        ) : (
          <div>
            <h1>please wait</h1>
            {/* <img src="load" alt="loader"></img> */}
          </div>
        )}
      </ThemeProvider>
    </div>
  );
}

export default Newspage;
