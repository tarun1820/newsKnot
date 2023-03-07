const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const bodyParser = require('body-parser');

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
app.use(passport.initialize());
app.use(passport.session());
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('17fd79449aed499ea71d113d678dea49');

//mogodb connection,schema and model

//for local mongobb comment it to use cloud mongodb
const mongoDbUrl = 'mongodb://127.0.0.1:27017/testdb';
// const mongoDbUrl="mongodb+srv://tarun1820:$Tarun%401820@cluster0.aksnxov.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);

mongoose
  .connect(mongoDbUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connection succesfull');
  })
  .catch((err) => {
    console.log(err);
  });

/////////////////////////////////////////////////////            User Schema   ///////////////////////////////////////////////////
const userschema = new mongoose.Schema(
  {
    username: String,
    email: { type: String, unique: true },
    password: String,
    saved: [Object],
  },
  {
    collection: 'userinfo',
  }
);

////////////////////////////////////////////////////              Reactions Schema /////////////////////////////////////////////

const reactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: 'reactionInfo',
  }
);

///////////////////////////////////////////////////              Authentication API               ///////////////////////////////////////////

userschema.plugin(passportLocalMongoose);

const userinfo = mongoose.model('userinfo', userschema);
const reactionInfo = mongoose.model('reactionInfo', reactionSchema);
passport.use(userinfo.createStrategy());

passport.serializeUser(userinfo.serializeUser());
passport.deserializeUser(userinfo.deserializeUser());

//listining to signup form
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username);
  // const encriptedpassword = await bcrypt.hash(password,10);
  try {
    const olduserWithMail = await userinfo.findOne({ email });
    //checking for email if alredy registered or not
    const olduserWithUserName = await userinfo.findOne({ username });
    if (olduserWithMail) {
      // console.log("user")
      return res.json({ error: 'email alredy regitered' });
    }
    if (olduserWithUserName) {
      // console.log("user")
      return res.json({ error: 'username alredy regitered' });
    }

    userinfo.register(
      { username: req.body.username, email: email },
      password,
      (err, user) => {
        if (err) {
          console.log(err);
          // res.("/login")
        } else {
          passport.authenticate('local')(req, res, () => {
            //  req.session.save();
            res.send({ status: 'ok' });
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.send({ status: 'not ok' });
  }
});

/////////////////////////////////////////////////////////    Login Route /////////////////////////////////////////////////

//listining to login form
app.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  const newuser = new userinfo({
    username,
    password,
  });

  passport.authenticate('local', function (err, newuser, info) {
    if (err) {
      return res.status(401).json(err);
    }
    if (!newuser) {
      return res.send({ status: 'Unauth' });
    }

    req.logIn(newuser, function (err) {
      if (err) {
        return next(err);
      }
      return res.send({ status: 'ok' });
    });
  })(req, res, next);
});

///////////////////////////////////////////////////////////////// User Route /////////////////////////////////////////////
//post request for axising newsapi
app.post('/user', function (req, res) {
  let category = req.body.category || 'general';
  // console.log(category)
  newsapi.v2
    .topHeadlines({
      category: category,
      country: req.body.country || 'in',
      pageSize: 20,
    })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.get('/user', (req, res) => {
  // console.log(req.session)
  if (req.isAuthenticated()) {
    res.send(req.session.passport.user);
  } else {
    res.send({ status: 'not login' });
  }
});

/////////////////////////////////////////////////////////////   Reaction Route ///////////////////////////////////////////////////

app.get('/user/:title', async (req, res) => {
  try {
    const item = await reactionInfo.find({ title: req.params.title });
    if (item.length === 0) {
      return res.status(400).json({
        success: false,
        error_id: 0,
        message: 'The article with title not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'successFull get Request',
      likes: item[0].likes,
      dislikes: item[0].dislikes,
    });
  } catch (err) {
    res.status(408).json({
      success: false,
      error_id: 1,
      message: err.message,
    });
  }
});

app.post('/user/:title', async (req, res) => {
  try {
    const articleReactions = await reactionInfo.find({
      title: req.params.title,
    });
    // console.log(articleReactions);
    if (articleReactions.length !== 0) {
      try {
        console.log('Inside Put');
        console.log('article=', articleReactions);
        const item = await reactionInfo.findOneAndReplace(
          { title: req.params.title },
          {
            title: req.params.title,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
          }
        );
        const update_item = await reactionInfo.find({
          title: req.params.title,
        });

        console.log('up_item=', update_item);

        res.status(200).json({
          success: true,
          data: update_item,
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          message: 'replace Failed',
        });
      }
    } else {
      try {
        const item = await reactionInfo.create(req.body);

        res.status(200).json({
          success: true,
          data: item,
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          message: 'creating an entry in database failed',
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

///////////////////////////////////////////////////////////////// Logout Route ////////////////////////////////////////////////////

app.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send({ status: 'logout' });
  });
  // req.logOut();
  // res.clearCookie('connect.sid');
  console.log('cookie deleted');
});

///////////////////////////////////////////////////////////////////// Save Route ////////////////////////////////////////////////////

app.post('/save', function (req, res) {
  const { cardarticle } = req.body;
  const userid = req.user.id;
  userinfo.findById(userid, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        console.log('user found');
        for (let i = 0; i < foundUser.saved.length; i++) {
          if (foundUser.saved[i].title === cardarticle.title) {
            return res.send({ status: 'alredy saved' });
          }
        }

        foundUser.saved.unshift(cardarticle); //pushing article to saved object to user
        foundUser.save(() => {
          res.send({ status: 'saved sucess' });
        });
        return; //function to save founduserobject in db
      }
    }
  });
});

app.get('/save', function (req, res) {
  if (req.isAuthenticated()) {
    // console.log(res.send(req.session.passport.user));
    const userid = req.user.id;
    userinfo.findById(userid, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          res.send({ saved_articles: foundUser.saved });
        }
      }
    });
  } else {
    res.send({ status: 'not login' });
  }
});
//backend is listing to port 5000
app.listen(5000, () => {
  console.log('sever started');
});

////////////////////////////////////////////////    Reactions
