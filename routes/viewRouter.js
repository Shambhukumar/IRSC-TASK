const express = require("express");

const router = express.Router();

const viewController = require("./../controllers/viewController");
const userController = require("./../controllers/userController");

router.get("/", userController.isLoggedIn, viewController.getoverview);

module.exports = router;
