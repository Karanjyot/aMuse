const passport = require("passport");
const isAuthenticated = require("../middleware/isAuthenticated");
const User = require("../models/User");
const Account = require("../models/Account");
const Song = require("../models/Song");
const Image = require("../models/Image");
const Library = require("../models/Library");
module.exports = (app) => {
  //*****************************************AUTHENTICATION ROUTES******************************************************************
  //Google Authentication
  //when user hits this route we ask passport to authenticate using the strategy called google. Scope allows google to know what permissions we are asking for.
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  //once user is confirm authentication,user is redirected to url below with a code. Passport calls on the google strategy which calls on accessToken inside GoogleStrategy.
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/home");
      // redirect to the home route handler
    }
  );

  //***********************************************************************************************************

  //Local Authentication

  app.post("/api/local/signin", (req, res) => {
    const userNew = {
      email: req.body.email,
      password: req.body.password,
    };
    User.create(userNew)
      .then((usr) => {
        const account = {
          artist_nickname: "",
          genre: "",
          description: "",
          country: "",
          city: "",
          userId: usr._id,
        };
        Account.create(account).then((acc) => {
          passport.authenticate("local")(req, res, () => {
            res.json({
              msg: "Sign-in Successful",
              account: acc,
            });
          });
        });
      })
      .catch((err) => {
        res.json({
          msg: err.message,
          error: err,
        });
      });
  });
  app.post("/api/local/login", passport.authenticate("local"), (req, res) => {
    res.json({
      msg: "Login Successful, Congrats asshole, FINALLY",
    });
  });

  //logout is automatically attached to the req object by passport. It takes the cookie that contains user id and removes the id.
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
  //***********************************************************************************************************

  //*******************************************RESTful routes****************************************************************

  //Route that allows us to retrieve our current user without any other async calls
  app.get("/api/current_user", isAuthenticated, (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });
  //Retrieving accounts for the home page along with the usersId
  app.get("/api/accounts/find", isAuthenticated, (req, res) => {
    Account.find({})
      .populate("songs")
      .populate("images")
      .then((accounts) => {
        res.json({
          msg: "Success, accounts found",
          accounts: accounts,
          currentUser: req.user,
        });
      })
      .catch((err) => console.log(err));
  });
  //Retrieving active users account
  app.get("/api/current_user/data", isAuthenticated, (req, res) => {
    const id = req.user._id;
    Account.findOne({
      userId: id,
    })
      .populate("songs")
      .populate("images")
      .then((account) => {
        res.json({
          msg: "Found users account",
          user: req.user,
          account,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  //Update info
  app.post("/api/current_user/update/:id", isAuthenticated, (req, res) => {
    const updateObj = {
      artist_nickname: req.body.name,
      genre: req.body.genre,
      description: req.body.desc,
      country: req.body.country,
      city: req.body.city,
      profilePicture: req.body.profilePicture,
    };
    Account.findByIdAndUpdate(req.params.id, updateObj)
      .then((value) => {
        res.json({
          msg: "update successful",
          value,
        });
      })
      .catch((err) => console.log(err));
  });
  //Upload and store images route
  app.post("/api/current_user/upload_img/:id", isAuthenticated, (req, res) => {
    const image = {
      name: req.body.name,
      downloadURL: req.body.downloadURL,
      authorID: req.user._id,
    };
    Account.findById(req.params.id)
      .then((acc) => {
        Image.create(image)
          .then((img) => {
            acc.images.push(img);
            acc.save();
            res.json({
              msg: "Your album photo was successfully uploaded to your account",
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        res.json({
          msg: err.message,
          error: err,
        });
      });
  });
  //Upload and store mp3 files
  app.post("/api/current_user/upload_song/:id", isAuthenticated, (req, res) => {
    const song = {
      name: req.body.name,
      downloadURL: req.body.downloadURL,
      albumPhoto: req.body.albumPhoto,
      authorID: req.user._id,
    };
    Account.findById(req.params.id)
      .then((acc) => {
        Song.create(song)
          .then((sng) => {
            acc.songs.push(sng);
            acc.save();
            res.json({
              msg: "Song has been successfully stored",
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) =>
        res.json({
          msg: "Account not found",
          error: err,
        })
      );
  });

  //Route that identifies a user based off accountID
  app.get("/api/findUser/:accId", isAuthenticated, (req, res) => {
    Account.findById(req.params.accId)
      .populate("images")
      .populate("songs")
      .then((acc) => {
        res.json({
          msg: "Users Account found successfuly",
          accountInfo: acc,
          currentUser: req.user,
        });
      })
      .catch((err) => {
        res.json({
          msg: "Error: Could not find account::" + err.message,
          error: err,
        });
      });
  });

  // retrieve all songs

  app.get("/api/songs", isAuthenticated, (req, res) => {
    Song.find({})
      .then((songs) => {
        res.json({ songs: songs });
      })
      .catch((err) => res.json(err));
  });

  app.get("/api/song/:id", isAuthenticated, (req, res) => {
    Song.findById(req.params.id)
      .then((song) => {
        Account.find({
          userId: song.authorID,
        }).then((account) => {
          res.json({
            msg: "Author found",
            currentUser: req.user,
            song,
            account,
          });
        });
      })
      .catch((err) => console.log(err));
  });

  //Save song to library

  app.post("/api/current_user/save_song/:id", isAuthenticated, (req, res) => {
    Account.findById(req.params.id).then((account) => {
      Library.create({ song: req.body.song_id })
        .then((lib) => {
          account.library.push(lib);
          acc.save();
          res.json({
            msg: "Song has been successfully stored to Library",
          });
        })
        .catch((err) =>
          res.json({
            msg: "Account not found",
            error: err,
          })
        );
    });
  });

//   app.post("/api/current_user/upload_song/:id", isAuthenticated, (req, res) => {
//     const song = {
//       name: req.body.name,
//       downloadURL: req.body.downloadURL,
//       albumPhoto: req.body.albumPhoto,
//       authorID: req.user._id,
//     };
//     Account.findById(req.params.id)
//       .then((acc) => {
//         Song.create(song)
//           .then((sng) => {
//             acc.songs.push(sng);
//             acc.save();
//             res.json({
//               msg: "Song has been successfully stored",
//             });
//           })
//           .catch((err) => console.log(err));
//       })
//       .catch((err) =>
//         res.json({
//           msg: "Account not found",
//           error: err,
//         })
//       );
//   });

  // msg:'Success, accounts found',
  // accounts:accounts,
  // app.get('/api/accounts/find',isAuthenticated, (req, res)=> {
  //     Account.find({})
  //         .then(accounts => {
  //             res.json({
  //                 msg:'Success, accounts found',
  //                 accounts:accounts,
  //                 currentUser: req.user

  //             });
  //         }).catch(err=> console.log(err));
};
