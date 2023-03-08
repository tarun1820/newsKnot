const userinfo = require('../models/user');
const passport = require('passport');

// SignUpPostRequest
// Route  '/signup'
exports.SignUpPostRequest = async (req, res, next) => {
  const { username, email, password } = req.body;
  // const encriptedpassword = await bcrypt.hash(password,10);
  try {
    const olduserWithMail = await userinfo.findOne({ email });
    //checking for email if alredy registered or not
    const olduserWithUserName = await userinfo.findOne({ username });
    if (olduserWithMail) {
      // console.log("user")
      return res.json({ error: 'email alredy registered' });
    }
    if (olduserWithUserName) {
      // console.log("user")
      return res.json({ error: 'username alredy registered' });
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
};

// LoginPostRequest
// Route '/login'
exports.LoginPostRequest = async (req, res, next) => {
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
};

// LogoutGetRequest
// Route '/logout'

exports.LogoutGetRequest = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send({ status: 'logout' });
  });
};
