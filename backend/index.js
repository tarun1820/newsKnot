const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const http = require("http");
const socket = require("socket.io");
const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "news api",
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 600000000 },
  })
);

// Passport Initialize
app.use(passport.initialize());
app.use(passport.session());

//Mongo DB connection

connectDB();
const userinfo = require("./models/user");
const discussionsInfo = require("./models/discussion"); //discussion model
const reactionsRoute = require("./routes/reactions");
const newsPageRoute = require("./routes/newspage");
const savedRoute = require("./routes/save");
const authenticationRoute = require("./routes/authentication");
const discussionsRoute = require("./routes/discussions");
const { title } = require("process");

passport.use(userinfo.createStrategy());

passport.serializeUser(userinfo.serializeUser());
passport.deserializeUser(userinfo.deserializeUser());

app.use("/", reactionsRoute);
app.use("/", newsPageRoute);
app.use("/", savedRoute);
app.use("/", authenticationRoute);
app.use("/", discussionsRoute);

const server = app.listen(5000, () => console.log(`Server started on ${PORT}`));

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  console.log("connected" + new Date());
  socket.on("discuus_on_article", (data) => {
    console.log("title==", data);
    const userexist = discussionsInfo.findOne(
      { title: data },
      (err, foundArticle) => {
        if (err) {
          console.log("error responce =", err);
        } else {
          // console.log("title in room find", foundArticle);
          if (!foundArticle) {
            let created_room = new discussionsInfo({ title: data });
            created_room.save((err, data) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Data inserted");
              }
            });
            console.log("creation success");
          }
        }
      }
    );
    socket.join(data);
    console.log("joined room");
  });

  socket.on("send_message", (data) => {
    console.log("back end send message");
    console.log(data.username);
    const userexist = discussionsInfo.findOne(
      { title: data.title },
      (err, foundArticle) => {
        if (err) {
          console.log(err);
        } else {
          foundArticle.list_of_message_and_user.unshift(data);
          foundArticle.save(() => {
            console.log("message pushed success");
          });
        }
      }
    );
    io.to(data.title).emit("receve_message", data);
  });
});

////////////////////////////////////////////////    Reactions
