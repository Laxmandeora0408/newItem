if(process.env.NODE_ENV!="production"){
  require('dotenv').config();
}
console.log(process.env.SECERET)
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const MongoStore = require('connect-mongo');
const path = require("path");
// const MONGO_URL = "mongodb://127.0.0.1:27017/bulk"; 
const dbUrl = process.env.ATLASDB_URL;
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./router/listing.js");
const reviewRouter = require("./router/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.js");
const userRouter = require("./router/user.js");
const wrapAsync = require("./utils/wrapAsync.js");
const filterRouter = require("./router/filters.js");
const Listing = require("./models/listing.js");

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECERET
  },
  touchAfter: 24*3600
})

store.on("error",()=>console.log("error in mongo session store"));

const sessionOption = {
  store:store,
  secret: process.env.SECERET,
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly:true
  }
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname, "/public")));




app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
})

app.use("/listing",listingRouter);
app.use("/listing/:id/reviews",reviewRouter);
app.use("/",userRouter);
app.use("/",filterRouter)



app.all("*",wrapAsync, async(req,res,next)=>{
  next(new ExpressError(404,"page not found!"));
});

app.use((err,req,res,next) =>{
  let {statusCode= 500,message = "something went wrong!"}= err;
  res.status(statusCode).render("error.ejs",{message});
});


app.listen(8080, () => {
  console.log("server is listening to port 8080"); 
});
