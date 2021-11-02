var express = require("express");
var router = express.Router();
var passport = require("passport");

var bcrypt = require("bcryptjs");
var User = require("../models/user");

router.get("/", (req, res) => {
  res.render("index", { user: res.locals.currentUser });
});

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/sign-up", (req, res) => res.render("sign-up-form"));

router.post("/sign-up", (req, res, next) => {
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
});
module.exports = router;
