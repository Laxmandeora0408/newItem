const express = require("express");
const router = express.Router({mergeParams:true}); 
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js")
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");
const reviewController = require("../Controllers/reviews.js");

  router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview))
  
  router.delete("/:reviewId",isReviewAuthor, wrapAsync(reviewController.deleteReview))
  
  module.exports = router;