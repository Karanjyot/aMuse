const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    name: {
         type: String
    },
    downloadURL: {
        type: String,
        required: false
    },
    albumPhoto: {
        type: String, 
        required: false,
    },
    artist: {
        type:String 
    },
    genre:{
        type: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: `Comment`
        }
    ],
    likes: [                
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: `users`,
            }
       
    ],
    authorID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'  
    },
    accountID:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }
});

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;