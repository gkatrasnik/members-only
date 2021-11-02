var express = require("express");
var router = express.Router();
var controller = require("../controllers/controller");

// ROUTES
router.get("/", controller.index);

router.get("/log-in", controller.login_get);

router.post("/log-in", controller.login_post);

router.get("/log-out", controller.logout);

router.get("/sign-up", controller.signup_get);

router.post("/sign-up", controller.signup_post);
module.exports = router;
