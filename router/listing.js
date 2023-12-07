const express = require("express");
const router = express.Router(); 
const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js");

const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingControllers = require('../Controllers/listings.js');
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage }) 
const { listingSchema } = require("../schema");



router.route("/")
.get((listingControllers.index))
.post(isLoggedIn, upload.single("listing[image]"),wrapAsync(listingControllers.createNewListing))


//create new listing
router.get("/new",isLoggedIn,listingControllers.renderNewForm);

router.route("/:id")
.put(isLoggedIn,isOwner,upload.single("listing[image]"),wrapAsync(listingControllers.updateListing))
.get(isLoggedIn,listingControllers.showListing)
.delete(isOwner,listingControllers.deleteListing);

//edit listing--
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingControllers.editForm));

module.exports = router; 
