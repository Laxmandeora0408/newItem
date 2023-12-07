const express = require("express");
const router = express.Router();
const userController = require("../Controllers/user.js");

const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

router.route("/signup")
.get(userController.signUpPage)
.post(userController.signUp);

router.route("/login")
.get(userController.loginPage)
.post(saveRedirectUrl, passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: true,
}), userController.login);

router.get("/logout",userController.logOut);
  
module.exports = router;
