const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: {
        type: String,
        required: false
    },
    name: {
        type: String, 
        required: false
    },
    //***********************************************************************************************************

    email: {
        type: String, 
        required: false
    },
    password: {
        type: String, 
        required: false,
        bcrypt: true
    }  

});
userSchema.plugin(require('mongoose-bcrypt'))
//***********************************************************************************************************

const User = mongoose.model("users", userSchema)

module.exports = User;
// const mongoose = require('mongoose');

// const CommentSchema = new mongoose.Schema({
//     text: {
//         type: String
//     },
//     datePosted:{
//         type: Date,
//         default: Date.now()
//     },
//     authorID:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'users'  
//     }
// });

// const Song = mongoose.model('Comment', CommentSchema);

// module.exports = Song;