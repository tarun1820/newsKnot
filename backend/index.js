const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const PORT = 5000;

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
const reactionsRoute = require('./routes/reactions');
const newsPageRoute = require('./routes/newspage');
const savedRoute = require('./routes/save');
const authenticationRoute = require('./routes/authentication');

passport.use(userinfo.createStrategy());

passport.serializeUser(userinfo.serializeUser());
passport.deserializeUser(userinfo.deserializeUser());

app.use('/', reactionsRoute);
app.use('/', newsPageRoute);
app.use('/', savedRoute);
app.use('/', authenticationRoute);

app.listen(PORT, () => {
  console.log(`Server Running on Port : ${PORT}`);
});

////////////////////////////////////////////////    Reactions
