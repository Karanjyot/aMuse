const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    name: {
         type: String
    },
    downloadURL: {
        type: String
    },
    authorID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  
    },
    //Might be a good idea if we want to associate a photo with a song to display in a player
    photoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }
});

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;