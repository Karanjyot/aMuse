const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require ("passport");
const keys = require("./config/keys");
const cors = require("cors");

require("./models/User");
require("./services/passport");
const authRoutes = require("./routes/authRoutes")

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/email_app", {useFindAndModify:false, useNewUrlParser: true, useUnifiedTopology: true });

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

authRoutes(app);

const PORT = process.env.PORT || 5000;
// listen to port 
app.listen(PORT);
