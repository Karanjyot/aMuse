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
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: `Comment`
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: `Like`
        }
    ],
    authorID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'  
    },
});

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;