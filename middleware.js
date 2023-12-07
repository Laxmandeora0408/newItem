const express = require('express');
const passport = require('passport');
const Listing = require("./models/listing.js")
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");



module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log(req.originalUrl);
    req.session.redirectUrl = req.originalUrl; 
    req.flash("error", "You are not logged in, please log in first");
    return res.redirect("/login");
  }
  next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
    delete req.session.redirectUrl; 
  }
  next();
}

module.exports.isOwner = async(req,res,next) =>{
  let {id}  = req.params;
  const listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser.id)){
    req.flash("error", "you are not owner this listng");
    return res.redirect(`/listing/${id}`);
  } 
  next();
}

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");

    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
      const errMsg = error.details.map((el) => el.message).join(", ");

      throw new ExpressError(400, errMsg);
  } else {
      next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review || !review.author.equals(res.locals.currUser._id)) {
      req.flash("error", "You are not the owner of this review");
      return res.redirect("/listing");
    }

    next();
  }
