const passport = require("passport");
const keys = require("../config/keys");
const GoogleStrategy = require("passport-google-oauth20").Strategy
const mongoose = require("mongoose");

// user class 
const User = mongoose.model("users");
const Account = require('../models/Account');

// user arguement is the user we retrieved from the db. Turn mongo model instance to user ID. Put Id into the cookie.
passport.serializeUser((user,done)=>{
    done(null, user.id);
});

// doing the opposite of serializeUser. Turning the id here to a mongo model instance. Pull cookie back out and turn into a user. 
passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then(user =>{
        done(null,user);
    });
});

// allowing passport to use the new instance of passport strategy and adding 2 arguments
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
},async (accessToken, refreshToken, profile, done) => {

// find googleId of selected user from DB
   const existingUser = await User.findOne({googleId: profile.id})

   console.log(profile)
       
            if(existingUser) {
                //we have a record with given profile ID. Done allows passport to know that it needs to continue authentication flow.
                // 1st argument is an error object. Pass null since we found a user so there is no error. Second argument provides existing user to passport. 
                done(null, existingUser);
            }else{
                //we don't have a user record with this ID. Make a new record
                //creates record using model instance and saves it
               const user = await new User({ googleId: profile.id, name: profile.displayName }).save()
                // once user is created, pass user to passport and continue the authentication flow. 
               const account = await new Account({userId: user._id}).save();
                done(null,user);
            }
     
   
}));
//***********************************************************************************************************
const LocalStrategy = require("passport-local").Strategy;



passport.use(new LocalStrategy({
    usernameField: 'email',
},

    function(username, password, done) {
      
      User.findOne({
          email: username  
      }).then(function(dbUser) {
   
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        else if (!dbUser.verifyPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  ));

  //***********************************************************************************************************
