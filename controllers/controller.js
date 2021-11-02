var passport = require("passport");
var bcrypt = require("bcryptjs");
var User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.index = function (req, res) {
  res.render("index", { user: res.locals.currentUser });
};

exports.login_get = function (req, res) {
  res.render("log-in-form");
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

exports.signup_post = [
  body("password")
    .trim()

    // Validate minimum length of password
    // Optional for this context
    .isLength({ min: 4, max: 16 })

    // Custom message
    .withMessage("Password must be between 4 to 16 characters"),
  body("password_validate")
    .trim()
    // Custom validation
    // Validate confirmPassword
    .custom(async (confirmPassword, { req }) => {
      const password = req.body.password;

      // If password and confirm password not same
      // don't allow to sign up and throw error
      if (password !== confirmPassword) {
        throw new Error("Passwords must be same");
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.send(errors.array());
      return;
    } else {
      // Data from form is valid.

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
    }
  },
];

exports.membership_password_get = function (req, res) {
  res.render("membership-password");
};

exports.membership_password_post = async function (req, res) {
  if (req.body.membership_password != process.env.MEMBERSHIP_PASSWORD) {
    res.send("napačno geslo");
  } else {
    const user = new User(res.locals.currentUser);
    user.member = true;

    await User.findByIdAndUpdate(
      res.locals.currentUser._id,
      user,
      {},
      (err) => {
        if (err) return next(err);
        return res.redirect("/");
      }
    );
  }
};

exports.leave_membership_post = async function (req, res) {
  const user = new User(res.locals.currentUser);
  console.log(user);
  user.member = false;

  await User.findByIdAndUpdate(res.locals.currentUser._id, user, {}, (err) => {
    if (err) return next(err);
    return res.redirect("/");
  });
};
