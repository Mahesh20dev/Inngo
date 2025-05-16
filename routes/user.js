const express=require('express');
const router = express.Router();
const User=require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const userController=require('../controllers/user.js');
const {isLoggedIn}=require("../middleware.js");

router.get("/",wrapAsync(userController.home))

router.route("/signup")
.get(userController.signupform)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.loginform)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true,}),userController.login);

router.get("/logout",userController.logout)



router.get("/search",isLoggedIn,wrapAsync(userController.search)) 





module.exports = router;
