const passport = require("passport")
const isAuthenticated = require('../middleware/isAuthenticated');
const User = require('../models/User');
const Account = require('../models/Account');
module.exports=(app) =>{

//Google Aithentication 
    //when user hits this route we ask passport to authenticate using the strategy called google. Scope allows google to know what permissions we are asking for.
    app.get("/auth/google", passport.authenticate("google",{
        scope: ["profile", "email"]

    })
    );
    //once user is confirm authentication,user is redirected to url below with a code. Passport calls on the google strategy which calls on accessToken inside GoogleStrategy.
    app.get("/auth/google/callback", passport.authenticate("google"), (req,res)=>{
 
            res.redirect('/home');
      
        // redirect to the home route handler
        
    });
//***********************************************************************************************************

//Local Authentication

    app.post('/api/local/signin', (req,res)=> {
        const userNew = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(userNew)
            .then(usr => {
                const account = {
                    artist_nickname: "",
                    genre: "",
                    description: "",
                    country: "",
                    city: "",
                    userId: usr._id
                }
                Account.create(account)
                    .then(acc=> {
                        passport.authenticate("local")(req, res, ()=> {
                            res.json({
                                msg: "Sign-in Successful"
                            });
                        });
                    });
            }).catch(err=> {
                res.json({
                    msg: err.message,
                    error: err
                })
            });
    });
    app.post('/api/local/login',passport.authenticate("local"), (req,res)=> {
        res.json({
            msg: 'Login Successful, Congrats asshole, FINALLY'
        });
    });
//***********************************************************************************************************





    //logout is automatically attached to the req object by passport. It takes the cookie that contains user id and removes the id. 
    app.get("/api/logout", (req,res) =>{
        req.logout();
        res.redirect("/");
    })

    //send back the user. User is automatically attached to the req object by passport. Route to determine if user is signed in. 
    app.get("/api/current_user", isAuthenticated, (req,res)=>{
        res.send(req.user);
    });


};