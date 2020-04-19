const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    name: {
         type: String
    },
    downloadURL: {
        type: String,
        required: true
    },
    albumPhoto: {
        type: String, 
        required: false,
    },
    // comments: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: `Comment`
    //     }
    // ],
    // likes: {
    //     type: Number, 
    //     default: 0
    // },
    authorID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'  
    },
});

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;