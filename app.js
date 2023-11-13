const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const methodOverride = require('method-override')
const path = require("path");
const MONGO_URL = "mongodb://127.0.0.1:27017/bulk"; 
const ejsMate = require("ejs-mate");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.get("/listing/new", (req,res)=>{
  res.render("listing/new.ejs");
 })

 app.put("/listing/:id/", async(req,res)=>{
  let {id} = req.params;
 const newListing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
 console.log(newListing);
  res.redirect(`/listing/${id}`);
 })

app.get("/listing", async(req,res) =>{
  const allListing = await Listing.find({});
  res.render("listing/index.ejs",{allListing});
})

app.get("/listing/:id", async(req,res)=>{
  let {id} = req.params;
  let listing = await Listing.findById(id); 
  res.render("listing/show.ejs",{listing})
 })

 app.post("/listing", async(req,res)=>{
  let  newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listing");
 })



 app.get("/listing/:id/edit", async(req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listing/edit.ejs",{listing})
 })

 
app.delete("/listing/:id", async(req,res)=>{
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listing");
})


app.listen(8080, () => {
  console.log("server is listening to port 8080"); 
});
