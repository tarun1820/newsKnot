import "../cssfiles/articlePage/discussions.css";
import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Typography, Box, Button, Divider, TextField } from "@mui/material";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
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
  },
});

const socket = io.connect("http://localhost:5000");

function Discussions(props) {
  const title = props.title;
  const [Discussions, setDiscussions] = useState([]);
  const [message, setMessage] = useState("");
  const username = props.username;
  useEffect(() => {
    const fetchDisussions = () => {
      console.log(title);
      // console.log("inside fetch");
      try {
        axios
          .get(`http://localhost:5000/user/article/${title}`, {
            withCredentials: true,
          })
          .then((res) => {
            // console.log("response ====", res);
            setDiscussions(() => {
              console.log(res.data.discussions);
              return res.data.discussions;
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchDisussions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (title !== "") {
    socket.emit("discuus_on_article", title);
  }

  const sendMessage = () => {
    console.log("send mess usrname=", username);
    // console.log(message);
    socket.emit("send_message", { message, username, title });
  };

  useEffect(() => {
    socket.on("receve_message", (data) => {
      // console.log("receve  mess");

      setDiscussions((prevMessages) => [
        { message: data.message, username: data.username },
        ...prevMessages,
      ]);
    });
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <PeopleOutlinedIcon sx={{ fontSize: 40 }} />
          <Typography variant="h3"> Discussion </Typography>
        </Box>
        <div className="user_comment">
          <TextField
            id="comment_field"
            helperText="Your Opinions (max 400 characters)"
            label="Comment"
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            sx={{ width: "65%" }}
            inputProps={{ minLength: 1, maxLength: 400 }}
          />
          <div>
            {message.length >= 1 ? (
              <Button onClick={sendMessage} variant="outlined" sx={{ mt: 0.5 }}>
                Post
              </Button>
            ) : (
              <Button
                onClick={sendMessage}
                variant="outlined"
                sx={{ mt: 0.5 }}
                disabled
              >
                Post
              </Button>
            )}
          </div>
        </div>
      </ThemeProvider>
      <div className="article_other_comments">
        {Discussions.map((msg) => (
          <div className="article_other_comment">
            <Typography variant="p">{msg.username}</Typography>
            <Typography variant="p">{msg.message}</Typography>
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Discussions;
