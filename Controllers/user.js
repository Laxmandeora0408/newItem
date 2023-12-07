const passport = require("passport");
const User = require("../models/user.js");
module.exports.signUpPage = async(req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signUp = async (req, res) =>{
    try{
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log("User registered:", registeredUser);
    req.login(registeredUser,(err)=>{
      if(err){
        next(err)
      }
      req.flash("success", "Welcome to Wonderlust");
        res.redirect("/listing");
    })
    } catch (e) {
    console.error("Error during registration:", e.message);
    req.flash("error", e.message);
     res.redirect("/signup");
    }
}

module.exports.loginPage = async(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.login = async (req, res) => {
    req.flash("success","Welcome back to Wonderlust! You are logged in!" );
    let redirectUrl = res.locals.redirectUrl ||"/listing";
    res.redirect(redirectUrl);
};

module.exports.logOut = async(req,res,next)=>{
    req.logout((err)=>{
      if(err){
        next(err)
      }
      req.flash("success","you are logged out!");
      res.redirect("/listing");
    }
)
}
  

