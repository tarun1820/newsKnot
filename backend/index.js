const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const http = require('http');
const socket = require('socket.io');
const PORT = 5000;
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'news api',
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
const userinfo = require('./models/user');
const discussionsInfo = require('./models/discussion'); //discussion model
const reactionsRoute = require('./routes/reactions');
const newsPageRoute = require('./routes/newspage');
const savedRoute = require('./routes/save');
const authenticationRoute = require('./routes/authentication');
const discussionsRoute = require('./routes/discussions');
const profileRoute = require('./routes/profile');

const { title } = require('process');

passport.use(userinfo.createStrategy());

passport.serializeUser(userinfo.serializeUser());
passport.deserializeUser(userinfo.deserializeUser());

app.get('/user/profile', async (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    try {
      const userDetails = await userinfo.findById(userId);
      if (!userDetails) {
        return res.status(402).json({
          success: false,
          message:
            'Some weird error already login , so this should not come while getting user Details',
        });
      }
      res.status(200).json({
        username: userDetails.username,
        email: userDetails.email,
      });
    } catch {
      res.status(400).json({
        success: false,
        message: 'database fetching failed',
      });
    }
  } else {
    console.log('log out');
    res.send({ status: 'not login' });
  }
});

app.use('/', reactionsRoute);
app.use('/', newsPageRoute);
app.use('/', savedRoute);
app.use('/', authenticationRoute);
app.use('/', discussionsRoute);
app.use('/', profileRoute);

const server = app.listen(5000, () => console.log(`Server started on ${PORT}`));

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST'],
  },
});

io.on('connect', (socket) => {
  console.log('connected' + new Date());
  socket.on('discuus_on_article', (data) => {
    console.log('title==', data);
    const userexist = discussionsInfo.findOne(
      { title: data },
      (err, foundArticle) => {
        if (err) {
          console.log('error responce =', err);
        } else {
          // console.log("title in room find", foundArticle);
          if (!foundArticle) {
            let created_room = new discussionsInfo({ title: data });
            created_room.save((err, data) => {
              if (err) {
                console.log(err);
              } else {
                console.log('Data inserted');
              }
            });
            console.log('creation success');
          }
        }
      }
    );
    socket.join(data);
    console.log('joined room');
  });

  socket.on('send_message', (data) => {
    console.log('back end send message');
    console.log(data.username);
    const userexist = discussionsInfo.findOne(
      { title: data.title },
      (err, foundArticle) => {
        if (err) {
          console.log(err);
        } else {
          foundArticle.list_of_message_and_user.unshift(data);
          foundArticle.save(() => {
            console.log('message pushed success');
          });
        }
      }
    );
    io.to(data.title).emit('receve_message', data);
  });
});

app.get("/news_article/:encoded", (req, res) => {
  const encodedurl = req.params.encoded;
  const url = decodeURI(encodedurl);
  console.log("scraping started");
  axios.get(url).then(function (r2) {
    // We now have the article HTML, but before we can use Readability to locate the article content we need jsdom to convert it into a DOM object
    let dom = new JSDOM(r2.data, {
      url: firstResult.url,
    });

    // now pass the DOM document into readability to parse
    var article = new Readability(dom.window.document).parse();

    // Done! The article content is in the textContent property
    console.log("scraped article", article.textContent);
  });
  res.send(article);
});
////////////////////////////////////////////////    Reactions
