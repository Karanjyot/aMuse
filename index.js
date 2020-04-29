const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require ("passport");
const keys = require("./config/keys");
const cors = require("cors");
const path = require('path');
require('dotenv').config()
require("./models/User");
require("./services/passport");
const authRoutes = require("./routes/authRoutes")

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/email_app", {useFindAndModify:false, useNewUrlParser: true, useUnifiedTopology: true });
db = mongoose.connection
// generate app object
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(
    cookieSession({
        //how long cookie can exist in browser before expiring. 30 days here converted to miliseconds
        maxAge: 30 * 24 * 60 * 60 * 1000,
        //encrypt cookie
        keys:[keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
authRoutes(app);
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });

const PORT = process.env.PORT || 5000;
// listen to port 
app.listen(PORT);