const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const cors = require("cors");
const session = require("express-session");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");
const passport = require("passport");
const bodyParser = require("body-parser");
const http = require("http");
const socket = require("socket.io");
const path = require("path");
const PORT = process.env.PORT || 5000;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Load env Vars
dotenv.config({ path: "./config/config.env" });
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");
const axios = require("axios");

const app = express();
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);

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

app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));
const userinfo = require("./models/user");
const discussionsInfo = require("./models/discussion"); //discussion model
const reactionsRoute = require("./routes/reactions");
const newsPageRoute = require("./routes/newspage");
const savedRoute = require("./routes/save");
const authenticationRoute = require("./routes/authentication");
const discussionsRoute = require("./routes/discussions");
const profileRoute = require("./routes/profile");

const { title } = require("process");

passport.use(userinfo.createStrategy());

passport.serializeUser(userinfo.serializeUser());
passport.deserializeUser(userinfo.deserializeUser());

app.get("/user/profile", async (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    try {
      const user = await userinfo.findById(userId);
      var data = {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Bio: user.Bio,
        Org: user.Org,
        link1: user.links[0],
        link2: user.links[1],
        link3: user.links[2],
        link4: user.links[3],
        photo: user.profilePhoto,
      };
      res.status(200).json({
        success: true,
        details: data,
      });
    } catch {
      res.status(400).json({
        success: false,
        message: "Database operation failed",
      });
    }
  } else {
    console.log("log out");
    res.send({ status: "not login" });
  }
});

app.use("/", reactionsRoute);
app.use("/", newsPageRoute);
app.use("/", savedRoute);
app.use("/", authenticationRoute);
app.use("/", discussionsRoute);
app.use("/", profileRoute);

const server = app.listen(5000, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  socket.on("discuus_on_article", (data) => {
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
              }
            });
          }
        }
      }
    );
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    // console.log(data.username);
    const userexist = discussionsInfo.findOne(
      { title: data.title },
      (err, foundArticle) => {
        if (err) {
          console.log(err);
        } else {
          foundArticle.list_of_message_and_user.unshift(data);
          foundArticle.save(() => {});
        }
      }
    );
    io.to(data.title).emit("receve_message", data);
  });
});

app.get("/news_article", (req, res) => {
  // const encodedurl = req.params.encoded;
  const url = req.query.encodedurl;
  // console.log("url==", url);
  axios
    .get(url)
    .then(function (r2) {
      // We now have the article HTML, but before we can use Readability to locate the article content we need jsdom to convert it into a DOM object
      let dom = new JSDOM(r2.data, {
        url: url,
      });

      // now pass the DOM document into readability to parse
      var article = new Readability(dom.window.document).parse();

      // Done! The article content is in the textContent property
      // console.log("scraped article", article.textContent);
      res.send(article);
    })
    .catch((err) => {
      console.log(err);
    });
});

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: "http://localhost:5000/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //check user table for anyone with a facebook ID of profile.id
      userinfo.findOne(
        {
          socialId: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName,
        },
        function (err, user) {
          if (err) {
            return done(err);
          }
          //No user was found... so create a new user with values from Facebook (all the profile. stuff)
          if (!user) {
            user = new userinfo({
              socialId: profile.id,
              email: profile.emails[0].value,
              username: profile.displayName,
              latent_features: [25, 25, 25, 25, 100],
            });
            user.save(function (err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            //found user. Return
            return done(err, user);
          }
        }
      );
    }
    // async function (accessToken, refreshToken, profile, cb) {
    //   await userinfo.findOrCreate(
    //     {
    //       socialId: profile.id,
    //       email: profile.emails[0].value,
    //       username: profile.displayName,
    //       latent_features: [25, 25, 25, 25, 100],
    //     },
    //     function (err, user) {
    //       return cb(null, user);
    //     }
    //   );
    // }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    res.redirect("http://localhost:3000/user");
  }
);

function normalise(prop_list) {
  const den = prop_list.reduce((a, b) => a + b, 0);
  return prop_list.map((prop_val) => {
    return prop_val / den;
  });
}
app.put("/user", async (req, res) => {
  const username = req.body.username;
  const category = req.body.category;
  const category_id = req.body.category_id;
  const userdata = await userinfo.findOne({ username });
  const [sports, tech, health, entertainment] = [0, 1, 2, 3];
  if (userdata) {
    let latent_features = userdata.latent_features;
    console.log(category_id);
    latent_features[category_id] = latent_features[category_id] + 1;
    latent_features[latent_features.length - 1] =
      latent_features[latent_features.length - 1] + 1;
    console.log("laten update=", latent_features);
    // latent_features = normalise(latent_features);
    console.log("laten update=", latent_features);
    const user_data = await userinfo.findOneAndUpdate(
      {
        username,
      },
      { latent_features },
      {
        new: true,
      }
    );
  }
});

// Handle Unhandled promise rejections

process.on("unhandledRejections", (err, promise) => {
  console.log(`Error : ${err.message}.red`);

  server.close(() => process.exit(1));
});
