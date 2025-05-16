const express=require('express');
const router=express.Router();
const Listing=require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');

const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const controller=require('../controllers/listing.js')
const multer=require('multer');
const {storage}=require("../cloudConfig.js");
const upload=multer({storage})
//listing validation

router.route("/")
.get(wrapAsync(controller.index))
.post(isLoggedIn,upload.single("listing[image]"),wrapAsync( controller.insert));
 
router.route("/search")
.post(wrapAsync(controller.showSearch));
 //adding listing route
 
 router.get("/new",isLoggedIn,controller.insertform)

 router.route("/:id")
 .get(wrapAsync(controller.viewlist))
 .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(controller.update))
 .delete(isLoggedIn,isOwner,wrapAsync(controller.delete));
 
 
 //updating listing route
 router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(controller.updateform))


 module.exports = router;