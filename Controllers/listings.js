const Listing = require("../models/listing.js")
const isLoggedIn = require("../middleware.js");
const Review = require("../models/review.js")

module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs", { allListing });
}

module.exports.renderNewForm = (req, res) => {
    res.render("listing/new.ejs");
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const newListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file!=="undefined"){
        let url = req.file.path;
        let filename= req.file.filename;
        newListing.image = {url,filename}
        await newListing.save();
    }
    console.log(newListing);
    req.flash("success","Successfully listing Upgated!");
    res.redirect(`/listing/${id}`);
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listing");
    }

    res.render("listing/show.ejs", { listing });
};

module.exports.createNewListing = async (req, res, next) => {
    let url = req.file.path;
    let filename= req.file.filename;
    const newListing = new Listing(req.body.listing);
    console.log(newListing);
    console.log(req.user); 
    newListing.owner = req.user._id; 
    newListing.image = {url,filename}
    await newListing.validate();
    await newListing.save();
    req.flash("success","new listing added!");
    res.redirect("/listing");
}

module.exports.editForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requisted for does not exits");
        res.redirect("/listing");
    }
    let orignalImage =listing.image.url;
    orignalImage.replace("/upload","/upload/c_fill,h_300,w_250/e_blur:300")
    res.render("listing/edit.ejs", { listing });
}

module.exports.deleteListing = async (req, res) => {
    try {
      const { id } = req.params;
      await Listing.findByIdAndDelete(id);
      req.flash("success", "Listing deleted successfully");
      res.redirect('/listing');
    } catch (error) {
      console.error(error);
      req.flash("error", "An error occurred while deleting the listing");
      res.redirect('/listing');
    }
} 