const userinfo = require('../models/user');

exports.createSavedArtcle = (req, res, next) => {
  const { cardarticle } = req.body;
  const userid = req.user.id;
  userinfo.findById(userid, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        for (let i = 0; i < foundUser.saved.length; i++) {
          if (foundUser.saved[i].title === cardarticle.title) {
            return res.send({ status: 'already saved' });
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
};

exports.getSavedArticles = (req, res, next) => {
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
};
