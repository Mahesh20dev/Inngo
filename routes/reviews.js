const express=require('express');
const router = express.Router({ mergeParams: true });
const Listing=require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');
const Review=require("../models/review.js");
const {validateReview, isLoggedIn,isReviewsAuthor}=require("../middleware.js");
const reviewController = require('../controllers/reviews.js');


//review validation


//post review route
router.post("/",isLoggedIn,validateReview,wrapAsync( reviewController.addreview))

//delete review route
router.delete("/:reviewid",isLoggedIn,isReviewsAuthor,wrapAsync(reviewController.deletereview))

module.exports = router;