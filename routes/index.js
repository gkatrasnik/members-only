var express = require("express");
var router = express.Router();
var controller = require("../controllers/controller");

// ROUTES
router.get("/", controller.index);

router.get("/log-out", controller.logout);

router.get("/log-in", controller.login_get);
router.post("/log-in", controller.login_post);

router.get("/sign-up", controller.signup_get);
router.post("/sign-up", controller.signup_post);

router.get("/become-member", controller.become_member_get);
router.post("/become-member", controller.become_member_post);
router.post("/leave-membership", controller.leave_membership_post);

router.get("/create-post", controller.create_post_get);
router.post("/create-post", controller.create_post_post);

router.get("/become-admin", controller.become_admin_get);
router.post("/become-admin", controller.become_admin_post);

router.post("/leave-admin", controller.leave_admin_post);

router.post("/delete", controller.delete_post_post);

module.exports = router;
