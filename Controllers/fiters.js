const Listing = require("../models/listing.js")
const isLoggedIn = require("../middleware.js");
const id = require("faker/lib/locales/id_ID/index.js");

module.exports.mountains = async (req, res) => {
    let allListing = await Listing.find({ category: "Mountains" });
    res.render("listing/index.ejs", { allListing });
}

module.exports.trending = async (req, res) => {
    let allListing = await Listing.find({ category: "Trending" });
    res.render("listing/index.ejs", { allListing });
}

module.exports.rooms = async (req, res) => {
    let allListing = await Listing.find({ category: "Rooms" });
    res.render("listing/index.ejs", { allListing });
}

module.exports.iconicCities = async (req, res) => {
    let allListing = await Listing.find({ category: "Iconic Cities" });
    res.render("listing/index.ejs", { allListing });
}

module.exports.castles = async (req, res) => {
    let allListing = await Listing.find({ category: "Castle" });
    res.render("listing/index.ejs", { allListing });
}

module.exports.amazingPools = async (req, res) => {
    let allListing = await Listing.find({ category: "Amazing Pools" });
    res.render("listing/index.ejs", { allListing });
}

module.exports.camping = async (req, res) => {
    let allListing = await Listing.find({ category: "Camping" });
    res.render("listing/index.ejs", { allListing });
}

module.exports.farms = async (req, res) => {
    let allListing = await Listing.find({ category: "Farms" });
    res.render("listing/index.ejs", { allListing });
}

module.exports.artic = async (req, res) => {
    let allListing = await Listing.find({ category: "Arctic" });
    res.render("listing/index.ejs", { allListing });
}

module.exports.searchDestination = async(req, res) => {
    const searchDestination = req.query.searchDestination;
    console.log(searchDestination)
    let allListing = await Listing.find({ location:searchDestination});
    console.log(allListing)
    res.render("listing/index.ejs", { allListing });
  }