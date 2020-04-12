const passport = require("passport")
const isAuthenticated = require('../middleware/isAuthenticated');
const User = require('../models/User');
const Account = require('../models/Account');
const cors = require('cors');
module.exports=(app) =>{
//*****************************************AUTHENTICATION ROUTES******************************************************************
//Google Authentication 
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
                                msg: "Sign-in Successful",
                                account: acc
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

    //logout is automatically attached to the req object by passport. It takes the cookie that contains user id and removes the id. 
    app.get("/api/logout", (req,res) =>{
        req.logout();
        res.redirect("/");
    })
//***********************************************************************************************************


//*******************************************RESTful routes****************************************************************

//Route that allows us to retrieve our current user without any other async calls
app.get("/api/current_user", isAuthenticated, (req,res)=>{
    console.log(req.user)
    res.send(req.user);
});
//Retrieving accounts for the home page along with the usersId 
app.get('/api/accounts/find',isAuthenticated, (req, res)=> {
    Account.find({})
        .then(accounts => {
            res.json({
                msg:'Success, accounts found',
                accounts:accounts,
                currentUser: req.user

            });
        }).catch(err=> console.log(err));
});
//Retrieving active users account
app.get('/api/current_user/data', isAuthenticated, (req, res)=> {
    const id = req.user._id;
    Account.findOne({
        userId: id
    })
        .then(account=> {
            res.json({
                msg: 'Found users account',
                account
            });
        }).catch(err=> {console.log(err)});

});
//Update info 
app.post('/api/current_user/update/:id', isAuthenticated,(req, res)=> {
    const updateObj = {
        artist_nickname: req.body.name,
        genre: req.body.genre,
        description:  req.body.desc,
        country:  req.body.country, 
        city: req.body.city
    }
    Account.findByIdAndUpdate(req.params.id, updateObj)
    .then(value=> {
        res.json({
            msg: "update successful", 
            value
        });
    }).catch(err=> console.log(err));
});



















};