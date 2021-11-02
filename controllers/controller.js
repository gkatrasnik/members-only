var passport = require("passport");

var bcrypt = require("bcryptjs");
var User = require("../models/user");

exports.index = function (req, res) {
  res.render("index", { user: res.locals.currentUser });
};

exports.login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
});

exports.logout = function (req, res) {
  req.logout();
  res.redirect("/");
};

exports.signup_get = function (req, res) {
  res.render("sign-up-form");
};

exports.signup_post = function (req, res, next) {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    //if error
    if (err) {
      res.send(err);
    }

    // otherwise, store hashedPassword in DB
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      member: false,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
};
