import "../cssfiles/Profile/Articles(L&F).css";
import axios from "axios";
import { Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/joy/Box";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { useState, useEffect } from "react";
import NewsCardItem from "../NewsPageComponents/newsCardItem";

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

function UserArticles(props) {
  const [index, setIndex] = useState(0);

  const [userLikedArticles, setUserLikedArticles] = useState([]);
  const [userSavedArticles, setUserSavedArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/profile/liked", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUserLikedArticles(res.data.liked);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/profile/saved", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUserSavedArticles(res.data.saved.reverse());
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <div className="profile_page_btns_lf">
        <Tabs
          size="md"
          value={index}
          onChange={(event, value) => setIndex(value)}
          sx={{ borderRadius: "lg" }}
        >
          <TabList variant="plain">
            <Tab variant={index === 0 ? "outlined" : "plain"}>Favorites</Tab>
            <Tab variant={index === 1 ? "outlined" : "plain"}>Saved</Tab>
          </TabList>
          <TabPanel value={0}>
            <div>
              {userLikedArticles.map((article) => (
                <div className="article_card_profile">
                  <NewsCardItem save={false} cardarticle={article} />
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel value={1}>
            <div>
              {userSavedArticles.map((article) => (
                <div className="article_card_profile">
                  <NewsCardItem save={true} cardarticle={article} />
                </div>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default UserArticles;
