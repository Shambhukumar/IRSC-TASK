var express = require("express");
var router = express.Router();
const userController = require("./../controllers/userController");

/* GET users listing. */
router.route("/singup").post(userController.signup);
router.route("/singin").post(userController.isLoggedIn, userController.login);
router.route("/").get(userController.getallUsers);
router.get("/logout", userController.logout);
module.exports = router;
